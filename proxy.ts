import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";     
import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from "./lib/i18n/config";

export default createMiddleware({
  locales : SUPPORTED_LOCALES,
  defaultLocale : DEFAULT_LOCALE,
  localePrefix: 'always'
});

type JwtPayload = {
    sub: string;
    role: string[];
    isEmailVerified : boolean;
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const locale = pathname.split("/")[1];
    if(!SUPPORTED_LOCALES.includes(locale as Locale)) {
        return NextResponse.redirect(new URL("/vi", request.url));
    }
    const token = request?.headers.get("Authorization")?.split(" ")[1] || "" ; 
    let decode : JwtPayload | null = null;
    if(token) {
        try {
            decode = jwtDecode(token);
        }
        catch (error) {
           if(process.env.NODE_ENV === "development") {
            console.log(error);
           }
        }
    }
    
    if(pathname.includes("/dashboard") && !decode?.isEmailVerified) {
        return NextResponse.redirect(new URL("/", request.url));
    } 
    const response = NextResponse.next();
    return response;
}
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", '/', '/(vi|en)/:path*'],
};

