import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { API_MESSAGE } from "@/src/constants/api/messageApi";
import { AuthActionResponseData } from "@/types/response/auth.response";
import { VerifyEmailTokenSchema } from "@/validation/auth/verifyEmailTokenValidation";
import { HttpStatusCode } from "axios";

export const GET = wrapperHandler(async (request: Request) => {
  const token = new URL(request.url).searchParams.get("token") ?? "";
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
