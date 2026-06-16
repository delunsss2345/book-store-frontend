import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { API_MESSAGE } from "@/src/constants/api/messageApi";
import { ForgotPasswordResponse } from "@/types/response/auth.response";
import { ForgotPasswordSchema } from "@/validation/auth/forgotPasswordValidation";
import { HttpStatusCode } from "axios";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const parsed = ForgotPasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return ResponseApi.error(
      API_MESSAGE.FORGOT_PASSWORD_VALIDATION_FAILED,
      HttpStatusCode.UnprocessableEntity,
    );
  }

  const response = await api.post<ForgotPasswordResponse>(
    "auth/forgot-password",
    parsed.data,
  );

  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
