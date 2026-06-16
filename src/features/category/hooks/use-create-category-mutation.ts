import { categoryApi } from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: categoryApi.createCategory,
  });
