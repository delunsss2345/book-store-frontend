import { catalogApi } from "@/services/catalog.service";
import type { CatalogBookListQuery } from "@/types/request/catalog.request";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = (query: CatalogBookListQuery) => {
  const page = query?.page ?? 1;
  const limit = query?.limit ?? 12;

  return useQuery({
    queryKey: ["catalog", "books", page, limit],
    queryFn: () => catalogApi.getBooks({ page, limit }),
    select: (response) => response.data,
    staleTime: 60_000,
  });
};
