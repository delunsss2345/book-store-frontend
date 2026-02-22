import { reviewApi } from "@/services/review.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateReviewMutation = () =>
  useMutation({
    mutationFn: reviewApi.createReview,
  });
