import { reviewApi } from "@/services/review.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateReviewDraftMutation = () =>
  useMutation({
    mutationFn: reviewApi.createDraft,
  });
