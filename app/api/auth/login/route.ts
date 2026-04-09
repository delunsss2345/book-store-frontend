import {
  COOKIE_ACCESS_TOKEN_MAX_AGE,
  COOKIE_OPTIONS,
  COOKIE_REFRESH_TOKEN_MAX_AGE,
} from "@/config/cookie.config";
import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { LoginResponseData } from "@/types/response/auth.response";
import { LoginSchema } from "@/validation/auth/loginValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const parsed = LoginSchema.safeParse(payload);
  if (!parsed.success) {
    return ResponseApi.error(
      API_MESSAGE.AUTH_EMAIL_PASSWORD_EMPTY,
      HttpStatusCode.UnprocessableEntity,
    );
  }
  const response = await api.post<LoginResponseData>("auth/login", {
    ...payload,
  });
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
});
