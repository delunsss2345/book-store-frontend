import { authorApi } from "@/services/author.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateAuthorMutation = () =>
  useMutation({
    mutationFn: authorApi.createAuthor,
  });
