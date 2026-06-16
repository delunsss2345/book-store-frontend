import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { API_MESSAGE } from "@/src/constants/api/messageApi";
import { ResendEmailResponse } from "@/types/response/auth.response";
import { ResendEmailSchema } from "@/validation/auth/resendEmailValidation";
import { HttpStatusCode } from "axios";

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
