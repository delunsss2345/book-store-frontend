import { z } from "zod";

const bookFormatSchema = z.enum([
  "HARDCOVER",
  "PAPERBACK",
  "EBOOK",
  "AUDIOBOOK",
]);

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

export const scanIsbnSchema = z.object({
  isbn: z.string().regex(/^\d{10}(\d{3})?$/, {
    message: "ISBN phải chứa đúng 10 hoặc 13 chữ số.",
  }),
});

export const createBookSchema = z.object({
  lookupIsbn: z.string().optional(),
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
  formatItems: z
    .array(
      z.object({
        format: bookFormatSchema,
        isbn: z.string().min(1, "ISBN của định dạng là bắt buộc."),
        publicationYear: z.preprocess(
          emptyToUndefined,
          z.coerce
            .number()
            .int()
            .min(1000)
            .max(new Date().getFullYear() + 5)
            .optional(),
        ),
        edition: z.coerce.number().int().min(1, "Lần tái bản phải lớn hơn 0."),
      }),
    )
    .min(1, "Chọn ít nhất một định dạng sách."),
  pageCount: z.coerce.number().int().min(0).optional(),
  supplierId: z.string().optional(),
  coverImageUrl: z
    .string()
    .url("URL ảnh bìa không hợp lệ")
    .optional()
    .or(z.literal("")),
});

export type CreateBookFormInput = z.input<typeof createBookSchema>;
export type CreateBookFormValues = z.infer<typeof createBookSchema>;
