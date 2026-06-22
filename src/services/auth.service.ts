import type {
  ChangePasswordDTO,
  ForgotPasswordDTO,
  LoginDTO,
  LogoutDTO,
  RegisterDTO,
  ResendEmailDTO,
  ResetPasswordDTO,
  ResetPasswordValidateDTO,
} from "@/types/request/auth.request";

import type {
  ChangePasswordResponse,
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
  ResendEmailResponse,
  ResetPasswordResponse,
  ResetPasswordValidateResponse,
  VerifyEmailResponse,
  GetMeResponse,
} from "@/types/response/auth.response";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginDTO) =>
    http.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterDTO) =>
    http.post<RegisterResponse>("/auth/register", payload),

  me: () => http.get<GetMeResponse>("/auth/me"),

  refreshToken: () => http.post<RefreshTokenResponse>("/auth/refresh-token"),

  logout: () => http.post<LogoutResponse>("/auth/logout"),

  forgotPassword: (payload: ForgotPasswordDTO) =>
    http.post<ForgotPasswordResponse>("/auth/forgot-password", payload),

  verifyEmail: (token: string) =>
    http.get<VerifyEmailResponse>("/auth/verify-email", {
      params: { token },
    }),

  resendEmail: (payload: ResendEmailDTO) =>
    http.post<ResendEmailResponse>("/auth/resend-email", payload),

  changePassword: (payload: ChangePasswordDTO) =>
    http.post<ChangePasswordResponse>("/auth/change-password", payload),

  resetPasswordValidate: (payload: ResetPasswordValidateDTO) =>
    http.post<ResetPasswordValidateResponse>(
      "/auth/reset-password/validate",
      payload,
    ),

  resetPassword: (payload: ResetPasswordDTO) =>
    http.post<ResetPasswordResponse>("/auth/reset-password", payload),
};
