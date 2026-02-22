import { ApiResponse } from "@/types/response/base.response";

export type AuthorItemData = {
  id: string;
  name: string;
};

export type AuthorListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: AuthorItemData[];
};

export type AuthorBookItemData = {
  bookId: string;
  title: string;
  slug?: string | null;
  minPrice?: string | null;
  coverImageUrl?: string | null;
  isPrimary: boolean;
};

export type AuthorBookListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: AuthorBookItemData[];
};

export type AuthorItemResponse = ApiResponse<AuthorItemData>;
export type AuthorListResponse = ApiResponse<AuthorListData>;
export type AuthorBookListResponse = ApiResponse<AuthorBookListData>;
