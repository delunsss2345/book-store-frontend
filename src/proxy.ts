import { jwtDecode } from "jwt-decode";
import createMiddleware from "next-intl/middleware";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "../i18n/routing";
import { Locale, SUPPORTED_LOCALES } from "../lib/i18n/config";

const intlMiddleware = createMiddleware(routing);

type JwtPayload = {
  sub: string;
  roles: string[];
  isEmailVerified: boolean;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = pathname.split("/")[1];

  const cookieStore = await cookies();
  const language = cookieStore.get("NEXT_LOCALE")?.value || "vi";
  const token = cookieStore.get("accessToken")?.value || "";
  const header = await headers();

  const intlResponse = intlMiddleware(request);
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return NextResponse.redirect(
      new URL(`/${language}${pathname}`, request.url),
    );
  }

  if (!token && pathname.includes("/profile")) {
    return NextResponse.redirect(new URL(`/${language}/login`, request?.url));
  }
  let decode: JwtPayload | null = null;

  if (token) {
    try {
      decode = jwtDecode(token);
    } catch {
      if (process.env.NODE_ENV === "development") {
        header.delete("authorization");
        cookieStore.delete("accessToken");
        return NextResponse.redirect(
          new URL(`/${language}/login`, request.url),
        );
      }
    }
  }

  const base = new URL(`/${language}`, request.url);



  if (
    pathname.includes("/dashboard")
  ) {
    const roles = decode?.roles ?? [];
    if (roles.includes("USER") || roles.includes("GUEST")) return NextResponse.redirect(base);
    if (roles.length <= 0) return NextResponse.redirect(base);
    if (!token) return NextResponse.redirect(base);
    if (!decode?.isEmailVerified) {
      return NextResponse.redirect(base);
    }
  }

  const response = NextResponse.next(intlResponse);
  return response;
}
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
