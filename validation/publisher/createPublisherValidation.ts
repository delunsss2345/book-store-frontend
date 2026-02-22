import { z } from "zod";

export const CreatePublisherSchema = z.object({
  defaultName: z.string().min(1, "Tên nhà xuất bản không được để trống"),
});

export type CreatePublisherInput = z.infer<typeof CreatePublisherSchema>;
