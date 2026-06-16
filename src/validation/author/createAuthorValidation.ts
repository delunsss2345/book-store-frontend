import { z } from "zod";

export const CreateAuthorSchema = z.object({
  defaultName: z.string().min(1, "Tên tác giả không được để trống"),
});

export type CreateAuthorInput = z.infer<typeof CreateAuthorSchema>;
