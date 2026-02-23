import { COOKIE_OPTIONS, COOKIE_ACCESS_TOKEN_MAX_AGE, COOKIE_REFRESH_TOKEN_MAX_AGE } from "@/config/cookie.config";
import { API_MESSAGE } from "@/constants/api/messageApi";
import { handleError } from "@/lib/api/errorHandler";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { LoginResponse } from "@/types/response/auth.response";
import { LoginSchema } from "@/validation/auth/loginValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const parsed = LoginSchema.safeParse(payload);
        if (!parsed.success) {
            return ResponseApi.error(API_MESSAGE.AUTH_EMAIL_PASSWORD_EMPTY, HttpStatusCode.UnprocessableEntity)
        }
        const response = await api.post<LoginResponse>("auth/login", {
            ...payload
        })

        const cookieStore = await cookies();

        cookieStore.set("refreshToken", response.data.refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: COOKIE_REFRESH_TOKEN_MAX_AGE,
        });
        cookieStore.set("accessToken", response.data.accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: COOKIE_ACCESS_TOKEN_MAX_AGE,
        });
        return ResponseApi.success(response.data, HttpStatusCode.Ok);

    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Login API Error:", error);
        }
        return handleError(error);
    }
}