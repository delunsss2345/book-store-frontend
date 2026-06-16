import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
  lang: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
