import { CategoryListData, CategoryListResponse } from "@/types/response/category.response";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 30;

type UseCategoriesQueryParams = {
  page?: number;
  limit?: number;
};

const buildUrl = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }: UseCategoriesQueryParams) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  return `/api/categories?${params.toString()}`;
};

const fetchCategories = async (params: UseCategoriesQueryParams): Promise<CategoryListData> => {
  const url = buildUrl(params);
  const response = await fetch(url, { cache: "no-store" });
  const payload = (await response.json()) as CategoryListResponse;

  if (!response.ok || !payload.success) {
    const message = payload.message ?? "Unable to load categories";
    throw new Error(message);
  }

  return payload.data;
};

export const useCategoriesQuery = (params: UseCategoriesQueryParams = {}) =>
  useQuery<CategoryListData>({
    queryKey: ["categories", params.page ?? DEFAULT_PAGE, params.limit ?? DEFAULT_LIMIT],
    queryFn: async () => await fetchCategories(params),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData // khi data chạy thì data cũ vẫn được giữ lại tạm thời 
  });
