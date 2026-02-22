import { searchApi } from "@/services/search.service";
import { useMutation } from "@tanstack/react-query";

export const useReindexMutation = () =>
  useMutation({
    mutationFn: searchApi.reindex,
  });
