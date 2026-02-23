import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";     

type JwtPayload = {
    sub: string;
    role: string[];
    isEmailVerified : boolean;
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
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
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};