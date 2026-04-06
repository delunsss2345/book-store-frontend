import {
  COOKIE_OPTIONS,
  COOKIE_ACCESS_TOKEN_MAX_AGE,
  COOKIE_REFRESH_TOKEN_MAX_AGE,
} from "@/config/cookie.config";
import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { RegisterResponse } from "@/types/response/auth.response";
import { RegisterSchema } from "@/validation/auth/registerValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const parsed = RegisterSchema.safeParse(payload);
  if (!parsed.success) {
    return ResponseApi.error(
      API_MESSAGE.REGISTER_VALIDATION_FAILED,
      HttpStatusCode.UnprocessableEntity,
    );
  }
  const response = await api.post<RegisterResponse>("auth/register", {
    ...payload,
  });

  const cookieStore = await cookies();
  cookieStore.set("accessToken", response.data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: COOKIE_ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set("refreshToken", response.data.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: COOKIE_REFRESH_TOKEN_MAX_AGE,
  });

  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
