import type {
  CatalogBookListQuery,
  CatalogCategoriesQuery,
} from "@/types/request/catalog.request";
import type {
  CatalogBookDetailResponse,
  CatalogBookListResponse,
  CatalogCategoriesResponse,
  GetBookDetailResponse,
  HomeResponse,
} from "@/types/response/catalog.response";
import { http } from "@/utils/http";

export const catalogApi = {
  getHome: () => http.get<HomeResponse>("catalog/home"),

  getBooks: (query?: CatalogBookListQuery) => {
    const slugCategory = query?.slugCategory
    const keyword = query?.keyword;
    return http.get<CatalogBookListResponse>("catalog/books", {
      params: {
        ...(slugCategory && { slugCategory }),
        ...(keyword && { keyword }),
      },
    });
  },

  getBookById: (bookId: string) =>
    http.get<CatalogBookDetailResponse>(`catalog/books/${bookId}`),

  getBookBySlug: (slug: string) =>
    http.get<GetBookDetailResponse>(`catalog/books/slug/${slug}`),

  getCategories: (query?: CatalogCategoriesQuery) =>
    http.get<CatalogCategoriesResponse>("catalog/categories", {
      params: query,
    }),
};
