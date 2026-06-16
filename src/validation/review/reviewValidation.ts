import { z } from "zod";

export const CreateReviewSchema = z.object({
  bookId: z.number("bookId không được để trống"),
  bookVariantId: z.number("bookVariantId không được để trống"),
  rating: z.number().min(1, "Đánh giá tối thiểu 1 sao").max(5, "Đánh giá tối đa 5 sao"),
  content: z.string().optional(),
});

export const CreateReviewDraftSchema = z.object({
  bookId: z.number("bookId không được để trống"),
  bookVariantId: z.number("bookVariantId không được để trống"),
  userHint: z.string().min(1, "Gợi ý không được để trống"),
  tone: z.string().optional(),
  language: z.enum(["vi", "en"]).optional(),
  targetWords: z.number().optional(),
});

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type CreateReviewDraftInput = z.infer<typeof CreateReviewDraftSchema>;
