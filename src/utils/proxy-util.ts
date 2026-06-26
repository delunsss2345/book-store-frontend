import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import 'server-only';

export type RouteContext = {
    params: Promise<{
        path: string[];
    }>;
};
export const HOP_BY_HOP_HEADERS = [
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

export async function createBackendHeaders(request: NextRequest, {
    attachRefreshToken = false,
    attachLanguage = false
}) {
    const cookieStore = await cookies();
    const headers = new Headers(request.headers);

    for (const header of HOP_BY_HOP_HEADERS) {
        headers.delete(header);
    }

    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken && !headers.has("authorization")) {
        headers.set("authorization", `Bearer ${accessToken}`);
    }

    if (attachRefreshToken) {
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (refreshToken && !headers.has("x-refresh-token")) {
            headers.set("x-refresh-token", refreshToken);
        }
    }
    if (attachLanguage) {
        const language = cookieStore.get("appLanguage")?.value ?? "vi";
        if (language) {
            headers.set("x-app-lang", language);
        }
    }
    return headers;
}

export function appendSetCookies(response: NextResponse, backendResponse: Response) {
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
