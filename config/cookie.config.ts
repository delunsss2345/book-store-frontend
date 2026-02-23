export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

export const COOKIE_REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
export const COOKIE_ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 giờ