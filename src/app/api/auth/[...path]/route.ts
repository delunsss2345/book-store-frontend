import { envConfig } from "@/src/config/env.config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const HOP_BY_HOP_HEADERS = [
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
];

function appendSetCookies(response: NextResponse, backendResponse: Response) {
  const headers = backendResponse.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : backendResponse.headers.get("set-cookie")
        ? [backendResponse.headers.get("set-cookie") as string]
        : [];

  for (const cookie of setCookies) {
    response.headers.append("set-cookie", cookie);
  }
}

function createBackendUrl(request: NextRequest, path: string[]) {
  if (!envConfig.BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const requestUrl = new URL(request.url);
  // Prepend "auth" since this proxy specifically handles /api/auth/*
  const backendPath = ["auth", ...path].map(encodeURIComponent).join("/");
  const backendUrl = new URL(backendPath, envConfig.BACKEND_API_URL);
  backendUrl.search = requestUrl.search;

  return backendUrl;
}

async function createBackendHeaders(request: NextRequest) {
  const cookieStore = await cookies();
  const headers = new Headers(request.headers);

  for (const header of HOP_BY_HOP_HEADERS) {
    headers.delete(header);
  }

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${accessToken}`);
  }

  return headers;
}

async function proxyToBackend(request: NextRequest, context: RouteContext) {
  try {
    const { path } = await context.params;
    const backendUrl = createBackendUrl(request, path);
    const method = request.method.toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD";

    const backendResponse = await fetch(backendUrl, {
      method,
      headers: await createBackendHeaders(request),
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get("content-type");

    if (contentType) {
      responseHeaders.set("content-type", contentType);
    }

    const pathString = path.join("/");

    // Intercept auth endpoints to manage HttpOnly cookies for tokens
    if (
      (pathString === "login" ||
        pathString === "register" ||
        pathString === "refresh-token") &&
      backendResponse.ok &&
      contentType?.includes("application/json")
    ) {
      const data = await backendResponse.json();
      const response = NextResponse.json(data, {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        headers: responseHeaders,
      });
      console.log("Backend Headers: ", backendResponse.headers);
      appendSetCookies(response, backendResponse); // nó tự đính rồi không cần set thủ công

      // Save tokens to Next.js cookies if they exist in the response
      if (data?.data?.accessToken) {
        response.cookies.set({
          name: "accessToken",
          value: data.data.accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }

      if (data?.data?.refreshToken) {
        response.cookies.set({
          name: "refreshToken",
          value: data.data.refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }

      return response;
    }

    // Intercept logout to clear cookies
    if (pathString === "logout") {
      let data;
      if (contentType?.includes("application/json")) {
        data = await backendResponse.json();
      } else {
        data = { success: backendResponse.ok };
      }

      const response = NextResponse.json(data, {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        headers: responseHeaders,
      });

      appendSetCookies(response, backendResponse);

      // Clear tokens
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    // Default fallback for other /api/auth/* endpoints (like /api/auth/me)
    const response = new NextResponse(await backendResponse.arrayBuffer(), {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });

    appendSetCookies(response, backendResponse);

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, message },
      {
        status: 500,
      },
    );
  }
}

export const GET = proxyToBackend;
export const POST = proxyToBackend;
export const PUT = proxyToBackend;
export const PATCH = proxyToBackend;
export const DELETE = proxyToBackend;
