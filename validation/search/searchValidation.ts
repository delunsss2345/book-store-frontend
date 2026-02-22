import { z } from "zod";

export const SearchBooksSchema = z.object({
  q: z.string().min(1, "Từ khóa tìm kiếm không được để trống"),
  lang: z.string().optional(),
  limit: z.number().optional(),
  page: z.number().optional(),
});

export type SearchBooksInput = z.infer<typeof SearchBooksSchema>;
