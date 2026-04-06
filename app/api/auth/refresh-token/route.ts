import {
  COOKIE_OPTIONS,
  COOKIE_ACCESS_TOKEN_MAX_AGE,
  COOKIE_REFRESH_TOKEN_MAX_AGE,
} from "@/config/cookie.config";
import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { RefreshTokenResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    const response = await api.post<RefreshTokenResponse>(
      "auth/refresh-token",
      {
        refreshToken,
      },
    );

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

  return ResponseApi.error(
    API_MESSAGE.AUTH_EMAIL_PASSWORD_INVALID,
    HttpStatusCode.Unauthorized,
  );
});
