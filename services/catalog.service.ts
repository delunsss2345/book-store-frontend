import type {
  CatalogHomeQuery,
  CatalogBookListQuery,
  CatalogCategoriesQuery,
} from "@/types/request/catalog.request";
import type {
  CatalogHomeResponse,
  CatalogBookListResponse,
  CatalogBookDetailResponse,
  CatalogCategoriesResponse,
  GetBookDetailResponse,
  HomeResponse,
} from "@/types/response/catalog.response";
import { http } from "@/utils/http";

export const catalogApi = {
  getHome: () =>
    http.get<HomeResponse>("catalog/home"),

  getBooks: (query?: CatalogBookListQuery) =>
    http.get<CatalogBookListResponse>("catalog/books", { params: query }),

  getBookById: (bookId: string) =>
    http.get<CatalogBookDetailResponse>(`catalog/books/${bookId}`),

  getBookBySlug: (slug: string) =>
    http.get<GetBookDetailResponse>(`catalog/books/slug/${slug}`),

  getCategories: (query?: CatalogCategoriesQuery) =>
    http.get<CatalogCategoriesResponse>("catalog/categories", { params: query }),
};
