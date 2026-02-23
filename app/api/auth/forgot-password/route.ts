import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { ForgotPasswordResponse } from "@/types/response/auth.response";
import { ForgotPasswordSchema } from "@/validation/auth/forgotPasswordValidation";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Forgot Password API Error:", error);
    }

    return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
  }
}
