import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { ResetPasswordValidateResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const response = await api.post<ResetPasswordValidateResponse>(
    "auth/reset-password/validate",
    payload,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
