import { COOKIE_OPTIONS, COOKIE_ACCESS_TOKEN_MAX_AGE, COOKIE_REFRESH_TOKEN_MAX_AGE } from "@/config/cookie.config";
import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { RefreshTokenResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";


export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return ResponseApi.error(
        API_MESSAGE.REFRESH_TOKEN_MISSING,
        HttpStatusCode.Unauthorized,
      );
    }

    const response = await api.post<RefreshTokenResponse>("auth/refresh-token", {
      refreshToken,
    });

    cookieStore.set("refreshToken", response.data.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_REFRESH_TOKEN_MAX_AGE,
    });
    cookieStore.set("accessToken", response.data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_ACCESS_TOKEN_MAX_AGE,
    });
    
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Refresh Token API Error:", error);
    }

    return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
  }
}
