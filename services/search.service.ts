import type { SearchBooksQuery } from "@/types/request/search.request";
import type { SearchBooksResponse } from "@/types/response/search.response";
import { http } from "@/utils/http";

export const searchApi = {
  search: (query: SearchBooksQuery) =>
    http.get<SearchBooksResponse>("/search", { params: query }),

  reindex: () =>
    http.post("/search/reindex"),
};
