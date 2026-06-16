import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import {
  COOKIE_ACCESS_TOKEN_MAX_AGE,
  COOKIE_OPTIONS,
  COOKIE_REFRESH_TOKEN_MAX_AGE,
} from "@/src/config/cookie.config";
import { API_MESSAGE } from "@/src/constants/api/messageApi";
import { RefreshTokenResponseData } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

export const POST = wrapperHandler(async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    const response = await api.post<RefreshTokenResponseData>(
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
