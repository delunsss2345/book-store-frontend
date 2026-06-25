import { z } from "zod";

export const scanIsbnSchema = z.object({
  isbn: z.string().regex(/^\d{10}(\d{3})?$/, {
    message: "ISBN phải chứa đúng 10 hoặc 13 chữ số.",
  }),
});

export const createBookSchema = z.object({
  isbn: z.string().min(1, "ISBN là bắt buộc."),
  language: z.string().min(1),
  title: z.string().min(1, "Tiêu đề sách là bắt buộc."),
  description: z.string().min(1, "Mô tả sách là bắt buộc."),
  widthCm: z.coerce.number().min(0).optional(),
  heightCm: z.coerce.number().min(0).optional(),
  thicknessCm: z.coerce.number().min(0).optional(),
  weightGrams: z.coerce.number().min(0).optional(),
  authorName: z.string().min(1, "Tác giả là bắt buộc."),
  publisherName: z.string().min(1, "Nhà xuất bản là bắt buộc."),
  categoryId: z.string().min(1, "Danh mục là bắt buộc."),
  publicationYear: z.coerce.number().int().min(1000).max(new Date().getFullYear() + 5).optional(),
  pageCount: z.coerce.number().int().min(0).optional(),
  supplierId: z.string().optional(),
  coverImageUrl: z.string().url("URL ảnh bìa không hợp lệ").optional().or(z.literal("")),
});

export type CreateBookFormValues = z.infer<typeof createBookSchema>;
