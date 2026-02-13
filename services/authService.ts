import type {
  ChangePasswordPayload,
  ForgotPasswordDTO,
  LoginDTO,
  LogoutDTO,
  RegisterDTO,
  ResendEmailDTO,
  VerifyAccountPayload,
} from "@/types/request/auth.request";

import type {
  ChangePasswordResponse,
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
  ResendEmailResponse,
  VerifyAccountResponse,
  VerifyEmailResponse,
} from "@/types/response/auth.response";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginDTO) =>
    http.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterDTO) =>
    http.post<RegisterResponse>("/auth/register", payload),

  forgotPassword: (payload: ForgotPasswordDTO) =>
    http.post<ForgotPasswordResponse>("/auth/forgot-password", payload),

  resendEmail: (payload: ResendEmailDTO) =>
    http.post<ResendEmailResponse>("/auth/resend-email", payload),

  verifyEmail: (token: string) =>
    http.get<VerifyEmailResponse>("/auth/verify-email", {
      params: { token },
    }),

  logout: (payload: LogoutDTO) =>
    http.post<LogoutResponse>("/auth/logout", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    http.post<ChangePasswordResponse>("/auth/change-password", payload),

  verifyAccount: (userId: number | string, payload: VerifyAccountPayload) =>
    http.post<VerifyAccountResponse>(`/auth/verify/${userId}`, payload),

  refreshToken: () =>
    http.post<RefreshTokenResponse>("/auth/refresh-token"),
};
