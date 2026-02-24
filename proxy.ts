import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from "./lib/i18n/config";
import { cookies } from "next/headers";

export default createMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});

type JwtPayload = {
  sub: string;
  roles: string[];
  isEmailVerified: boolean;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];
  const cookieStore = await cookies();
  const language = cookieStore.get("appLanguage")?.value || "vi";
  const token = cookieStore.get("accessToken")?.value || "";
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return NextResponse.redirect(
      new URL(`/${language}${pathname}`, request.url),
    );
  }

  let decode: JwtPayload | null = null;
  if (token) {
    try {
      decode = jwtDecode(token);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
    }
  }
  const base = new URL(`/${language}`, request.url);

  if (
    pathname.endsWith("/dashboard") &&
    !decode?.roles?.includes(
      request.nextUrl.pathname.split("/")[2]?.toUpperCase(),
    )
  ) {
    if (!decode?.isEmailVerified) {
      return NextResponse.redirect(base);
    }

    const roles = decode?.roles ?? [];

    switch (true) {
      case roles.includes("ADMIN"):
        return NextResponse.redirect(
          new URL(`/${language}/admin/dashboard`, request.url),
        );

      case roles.includes("STAFF"):
        return NextResponse.redirect(
          new URL(`/${language}/staff/dashboard`, request.url),
        );

      case roles.includes("WAREHOUSE"):
        return NextResponse.redirect(
          new URL(`/${language}/warehouse/dashboard`, request.url),
        );

      case roles.includes("SALE"):
        return NextResponse.redirect(
          new URL(`/${language}/sale/dashboard`, request.url),
        );

      default:
        return NextResponse.redirect(base);
    }
  }
  const response = NextResponse.next();
  return response;
}
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/", "/(vi|en)/:path*"],
};
