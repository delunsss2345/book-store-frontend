import { categoryApi } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

interface UseCategoryQueryProps {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export const useCategoryQuery = (params?: UseCategoryQueryProps) =>
  useQuery({
    queryKey: ["categories", params],
    queryFn: async () => await categoryApi.getCategories(params),
  });
