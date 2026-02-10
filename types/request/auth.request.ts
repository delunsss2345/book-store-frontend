export type RegisterDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginDTO = {
  email: string;
  password: string;
  deviceFingerprint?: string;
};

export type LogoutDTO = {
  refreshToken: string;
};

export type RegisterPayload = RegisterDTO;
export type LoginPayload = LoginDTO;
export type LogoutPayload = LogoutDTO;

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type VerifyAccountPayload = {
  verifyToken: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};
