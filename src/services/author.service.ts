import type {
  CreateAuthorDTO,
  GetAuthorsQuery,
  GetAuthorBooksQuery,
} from "@/types/request/author.request";
import type {
  AuthorItemResponse,
  AuthorListResponse,
  AuthorBookListResponse,
} from "@/types/response/author.response";
import { http } from "@/utils/http";

export const authorApi = {
  getAuthors: (query?: GetAuthorsQuery) =>
    http.get<AuthorListResponse>("/authors", { params: query }),

  createAuthor: (payload: CreateAuthorDTO) =>
    http.post<AuthorItemResponse>("/authors", payload),

  getAuthorBooks: (authorId: string, query?: GetAuthorBooksQuery) =>
    http.get<AuthorBookListResponse>(`/authors/${authorId}/books`, { params: query }),
};
