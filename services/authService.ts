import type {
  ChangePasswordPayload,
  LoginDTO,
  LogoutDTO,
  RefreshTokenPayload,
  RegisterDTO,
  VerifyAccountPayload,
} from "@/types/request/auth.request";

import type {
  ChangePasswordResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
  VerifyAccountResponse,
} from "@/types/response/auth.response";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginDTO) =>
    http.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterDTO) =>
    http.post<RegisterResponse>("/auth/register", payload),

  logout: (payload: LogoutDTO) =>
    http.post<LogoutResponse>("/auth/logout", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    http.post<ChangePasswordResponse>("/auth/change-password", payload),

  verifyAccount: (userId: number | string, payload: VerifyAccountPayload) =>
    http.post<VerifyAccountResponse>(`/auth/verify/${userId}`, payload),

  refreshToken: (payload: RefreshTokenPayload) =>
    http.post<RefreshTokenResponse>("/auth/refresh", payload),
};
