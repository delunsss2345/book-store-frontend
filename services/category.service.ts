import type {
  CreateCategoryDTO,
  GetCategoriesQuery,
} from "@/types/request/category.request";
import type {
  CategoryItemResponse,
  CategoryListResponse,
} from "@/types/response/category.response";
import { http } from "@/utils/http";

export const categoryApi = {
  getCategories: (query?: GetCategoriesQuery) =>
    http.get<CategoryListResponse>("/categories", { params: query }),

  createCategory: (payload: CreateCategoryDTO) =>
    http.post<CategoryItemResponse>("/categories", payload),
};
