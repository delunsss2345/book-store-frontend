import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { ForgotPasswordResponse } from "@/types/response/auth.response";
import { ForgotPasswordSchema } from "@/validation/auth/forgotPasswordValidation";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

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
