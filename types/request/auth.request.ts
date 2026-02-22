export type RegisterDTO = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword: string;
};

export type LoginDTO = {
  email: string;
  password: string;
  deviceFingerprint?: string;
};

export type ForgotPasswordDTO = {
  email: string;
};

export type ResendEmailDTO = {
  email: string;
};

export type LogoutDTO = {
  refreshToken: string;
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type VerifyEmailDTO = {
  token: string;
};

export type RefreshTokenDTO = {
  refreshToken: string;
};

export type ResetPasswordValidateDTO = {
  token: string;
};

export type ResetPasswordDTO = {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterPayload = RegisterDTO;
export type LoginPayload = LoginDTO;
export type ForgotPasswordPayload = ForgotPasswordDTO;
export type ResendEmailPayload = ResendEmailDTO;
export type LogoutPayload = LogoutDTO;
export type ChangePasswordPayload = ChangePasswordDTO;
export type VerifyEmailPayload = VerifyEmailDTO;
export type RefreshTokenPayload = RefreshTokenDTO;
export type ResetPasswordValidatePayload = ResetPasswordValidateDTO;
export type ResetPasswordPayload = ResetPasswordDTO;
