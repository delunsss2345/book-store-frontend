import { searchApi } from "@/services/search.service";
import type { SearchBooksQuery } from "@/types/request/search.request";
import { useQuery } from "@tanstack/react-query";

export const SEARCH_BOOKS_KEYS = {
  all: ["search", "books"] as const,
  list: (query: SearchBooksQuery) =>
    [...SEARCH_BOOKS_KEYS.all, query] as const,
};

export const useSearchBooksQuery = (query: SearchBooksQuery) => {
  const q = query.q ?? "";
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  return useQuery({
    queryKey: SEARCH_BOOKS_KEYS.list({ q, page, limit }),
    queryFn: () => searchApi.searchBooks({ q, page, limit }),
    select: (response) => response.data,
    enabled: q.trim().length >= 2,
    staleTime: 60_000,
  });
};
