import { z } from "zod";

export const ResendEmailSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});
