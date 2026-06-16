import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
  confirmNewPassword: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmNewPassword"],
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
