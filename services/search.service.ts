import type { SearchBooksQuery } from "@/types/request/search.request";
import type {
  SearchBooksISBNQuickFillResponse,
  SearchBooksResponse,
} from "@/types/response/search.response";
import { http } from "@/utils/http";

export const searchApi = {
  search: (query: SearchBooksQuery) =>
    http.get<SearchBooksResponse>("/search", { params: query }),

  reindex: () => http.post("/search/reindex"),

  searchByIsbn: (isbn: string, lang: string) =>
    http.get<SearchBooksISBNQuickFillResponse>(
      `/search/isbn?isbn=${isbn}&lang=${lang}`,
    ),
};
