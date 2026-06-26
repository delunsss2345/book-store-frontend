import { envConfig } from "@/src/config/env.config";
import { NextRequest, NextResponse } from "next/server";
import { appendSetCookies, createBackendHeaders, RouteContext } from '../../../utils/proxy-util';


function createBackendUrl(request: NextRequest, path: string[]) {
  if (!envConfig.BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const requestUrl = new URL(request.url);
  const backendPath = path.map(encodeURIComponent).join("/");
  const backendUrl = new URL(backendPath, envConfig.BACKEND_API_URL);
  backendUrl.search = requestUrl.search;

  return backendUrl;
}


async function proxyToBackend(request: NextRequest, context: RouteContext) {
  try {
    const { path } = await context.params;
    const backendUrl = createBackendUrl(request, path);
    const method = request.method.toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD";

    const backendResponse = await fetch(backendUrl, {
      method,
      headers: await createBackendHeaders(request, {
        attachLanguage: true
      }),
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get("content-type");

    if (contentType) {
      responseHeaders.set("content-type", contentType);
    }

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
