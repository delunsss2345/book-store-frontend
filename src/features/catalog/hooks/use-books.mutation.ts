import { useSearchSemanticQuery } from "@/features/search/hooks/use-search-sematic";
import { catalogApi } from "@/services/catalog.service";
import type { CatalogBookListQuery } from "@/types/request/catalog.request";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = (query: CatalogBookListQuery) => {
  const page = query?.page ?? 1;
  const limit = query?.limit ?? 12;
  const slugCategory = query?.slugCategory ?? "";
  const keyword = query?.keyword ?? "";

  const sematicQuery = useSearchSemanticQuery({ q: keyword, page, limit });

  const catalogQuery = useQuery({
    queryKey: ["catalog", "books", page, limit, slugCategory],
    queryFn: () => catalogApi.getBooks({ page, limit, slugCategory }),
    select: (response) => response.data,
    staleTime: 60_000,
    enabled: !keyword,
  });

  return keyword ? sematicQuery : catalogQuery;
};
