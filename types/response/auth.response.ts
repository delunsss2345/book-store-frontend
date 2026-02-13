export type ApiResponse<T> = {
  error: string | null;
  message: string;
  statusCode: number;
  data: T;
};

export type UserLoginResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | string | null;
  phoneNumber: string | null;
  roles: string[];
};

export type UserResponse = {
  id: number;
  email: string;
  verifyToken: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  phoneNumber: string | null;
  active: boolean;
  roles: string[];
  addresses: unknown[] | null;
};

export type AuthTokenData = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type LoginResponseData = AuthTokenData & {
  user: UserLoginResponse;
};

export type RefreshTokenResponseData = AuthTokenData & {
  user?: UserLoginResponse;
};

export type AuthActionResponseData = {
  success: boolean;
};

export type RegisterResponseData = UserResponse;

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
export type RegisterResponse = ApiResponse<RegisterResponseData>;
export type ForgotPasswordResponse = ApiResponse<AuthActionResponseData>;
export type ResendEmailResponse = ApiResponse<AuthActionResponseData>;
export type VerifyEmailResponse = ApiResponse<AuthActionResponseData>;

export type LogoutResponse = void;
export type ChangePasswordResponse = void;
export type VerifyAccountResponse = void;
