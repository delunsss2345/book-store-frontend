import type {
  CreateReviewDTO,
  CreateReviewDraftDTO,
  GetBookReviewsQuery,
} from "@/types/request/review.request";
import type {
  ReviewItemResponse,
  ReviewDraftResponse,
  ReviewListResponse,
} from "@/types/response/review.response";
import { http } from "@/utils/http";

export const reviewApi = {
  createReview: (payload: CreateReviewDTO) =>
    http.post<ReviewItemResponse>("/reviews", payload),

  createDraft: (payload: CreateReviewDraftDTO) =>
    http.post<ReviewDraftResponse>("/reviews/review/draft", payload),

  getBookReviews: (slug: string, query?: GetBookReviewsQuery) =>
    http.get<ReviewListResponse>(`/reviews/books/${slug}`, { params: query }),
};
