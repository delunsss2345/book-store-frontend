import { z } from "zod";

export const VerifyEmailTokenSchema = z.object({
  token: z.string().min(1, "Token xác minh không hợp lệ"),
});
