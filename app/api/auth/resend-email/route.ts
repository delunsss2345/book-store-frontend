import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { ResendEmailResponse } from "@/types/response/auth.response";
import { ResendEmailSchema } from "@/validation/auth/resendEmailValidation";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Resend Email API Error:", error);
    }

    return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
  }
}
