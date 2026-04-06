import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { ResendEmailResponse } from "@/types/response/auth.response";
import { ResendEmailSchema } from "@/validation/auth/resendEmailValidation";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const parsed = ResendEmailSchema.safeParse(payload);

  if (!parsed.success) {
    return ResponseApi.error(
      API_MESSAGE.RESEND_EMAIL_VALIDATION_FAILED,
      HttpStatusCode.UnprocessableEntity,
    );
  }

  const response = await api.post<ResendEmailResponse>(
    "auth/resend-email",
    parsed.data,
  );

  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
