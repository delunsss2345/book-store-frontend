import { z } from "zod";

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  password_confirmation: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["password_confirmation"],
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
