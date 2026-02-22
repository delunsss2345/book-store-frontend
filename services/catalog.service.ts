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
  getHome: (query?: CatalogHomeQuery) =>
    http.get<CatalogHomeResponse | HomeResponse>("catalog/home", { params: query }),

  getBooks: (query?: CatalogBookListQuery) =>
    http.get<CatalogBookListResponse>("catalog/books", { params: query }),

  getBookById: (bookId: string) =>
    http.get<CatalogBookDetailResponse>(`catalog/books/${bookId}`),

  getBookBySlug: (slug: string) =>
    http.get<GetBookDetailResponse>(`catalog/books/slug/${slug}?lang=vi`),

  getCategories: (query?: CatalogCategoriesQuery) =>
    http.get<CatalogCategoriesResponse>("catalog/categories", { params: query }),
};
