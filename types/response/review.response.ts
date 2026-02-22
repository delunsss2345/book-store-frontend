import { ApiResponse } from "@/types/response/base.response";

export type ReviewVariantData = {
  id: string;
  format: string;
};

export type ReviewItemData = {
  reviewId: string;
  userId: string;
  rating: number;
  content?: string | null;
  createdAt: string;
  variant: ReviewVariantData;
};

export type ReviewListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: ReviewItemData[];
};

export type ReviewDraftData = {
  bookId: string;
  bookVariantId: string;
  draftText: string;
  wordCount?: number;
};

export type ReviewItemResponse = ApiResponse<ReviewItemData>;
export type ReviewListResponse = ApiResponse<ReviewListData>;
export type ReviewDraftResponse = ApiResponse<ReviewDraftData>;
