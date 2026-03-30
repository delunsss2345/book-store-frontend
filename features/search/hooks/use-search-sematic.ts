import { searchApi } from "@/services/search.service";
import { SearchBooksQuery } from "@/types/request/search.request";
import { useQuery } from "@tanstack/react-query";

const BOOK_SEARCH_SEMANTIC_KEYS = {
  all: ["book-search-sematic"] as const,
  key: (keyword: string) =>
    [...BOOK_SEARCH_SEMANTIC_KEYS.all, keyword] as const,
};

export const useSearchSemanticQuery = (query: SearchBooksQuery) => {
  const q = query.q ?? "";
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  return useQuery({
    queryKey: BOOK_SEARCH_SEMANTIC_KEYS.key(q),
    queryFn: async () => searchApi.search({ q, page, limit }),
    select: (response) => response.data,
    enabled: !!q,
    staleTime: 1000 * 60,
  });
};
