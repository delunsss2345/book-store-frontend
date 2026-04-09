import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { AuthActionResponseData } from "@/types/response/auth.response";
import { VerifyEmailTokenSchema } from "@/validation/auth/verifyEmailTokenValidation";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export const GET = wrapperHandler(async (request: NextRequest) => {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const parsed = VerifyEmailTokenSchema.safeParse({ token });

  if (!parsed.success) {
    return ResponseApi.error(
      API_MESSAGE.VERIFY_EMAIL_TOKEN_INVALID,
      HttpStatusCode.UnprocessableEntity,
    );
  }

  const response = await api.get<AuthActionResponseData>("auth/verify-email", {
    query: { token: parsed.data.token },
  });

  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
