import type { CatalogHomeQuery } from "@/types/request/catalog.request";
import type { CatalogHomeResponse } from "@/types/response/catalog.response";
import { http } from "@/utils/http";

export const userEventsApi = {
  getHyperRecommendBooks: (query?: CatalogHomeQuery) =>
    http.get<CatalogHomeResponse>("/user-events/hyper-recommend/books", { params: query }),
};
