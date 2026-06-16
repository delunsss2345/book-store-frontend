import { dashboardService } from "@/services/dashboard.service";
import {
  CategoryItemData,
  CategoryListData,
} from "@/types/response/category.response";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 30;

type UseCategoriesQueryParams = {
  page?: number;
  limit?: number;
};

const normalizeCategoryListData = (
  data?: CategoryListData | CategoryItemData[],
): CategoryListData => {
  if (!data) {
    return {
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      total: 0,
      totalPages: 0,
      items: [],
    };
  }

  if (Array.isArray(data)) {
    const total = data.length;
    return {
      page: DEFAULT_PAGE,
      limit: total || DEFAULT_LIMIT,
      total,
      totalPages: total ? 1 : 0,
      items: data,
    };
  }

  return {
    page: data.page ?? DEFAULT_PAGE,
    limit: data.limit ?? DEFAULT_LIMIT,
    total: data.total ?? data.items?.length ?? 0,
    totalPages: data.totalPages ?? 1,
    items: data.items ?? [],
  };
};

const fetchCategories = async (
  params: UseCategoriesQueryParams,
): Promise<CategoryListData> => {
  const payload = await dashboardService.getCategories(params);

  if (!payload.success) {
    const message = payload.message ?? "Unable to load categories";
    throw new Error(message);
  }

  return normalizeCategoryListData(payload.data);
};

export const useCategoriesQuery = (params: UseCategoriesQueryParams = {}) =>
  useQuery<CategoryListData>({
    queryKey: ["categories", params.page ?? DEFAULT_PAGE, params.limit ?? DEFAULT_LIMIT],
    queryFn: async () => await fetchCategories(params),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData // khi data chạy thì data cũ vẫn được giữ lại tạm thời 
  });
