import { ApiResponse } from "@/types/response/base.response";

export type LoginUserData = {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  status: string;
};

export type RegisterUserData = {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  status: string;
};

export type LoginResponseData = {
  user: LoginUserData;
  accessToken: string;
  refreshToken: string;
};

export type RegisterResponseData = {
  user: RegisterUserData;
  accessToken: string;
  refreshToken: string;
};

export type AuthTokenData = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type ResetPasswordValidateResponseData = {
  valid: boolean;
};

export type RefreshTokenResponseData = AuthTokenData & {
  user?: LoginUserData;
};

export type AuthActionResponseData = {
  success: boolean;
};

export type UserLoginResponse = LoginUserData;
export type UserResponse = RegisterUserData;

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RegisterResponse = ApiResponse<RegisterResponseData>;
export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
export type ForgotPasswordResponse = ApiResponse<AuthActionResponseData>;
export type ResendEmailResponse = ApiResponse<AuthActionResponseData>;
export type VerifyEmailResponse = ApiResponse<AuthActionResponseData>;
export type ChangePasswordResponse = ApiResponse<AuthActionResponseData>;
export type ResetPasswordResponse = ApiResponse<AuthActionResponseData>;
export type ResetPasswordValidateResponse = ApiResponse<ResetPasswordValidateResponseData>;
export type LogoutResponse = ApiResponse<{ success: boolean }>;
export type GetMeResponse = ApiResponse<UserResponse>;