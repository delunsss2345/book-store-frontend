import { ApiResponse } from "@/types/response/base.response";

export type PublisherItemData = {
  id: string;
  name: string;
};

export type PublisherListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: PublisherItemData[];
};

export type PublisherBookItemData = {
  bookId: string;
  title: string;
  slug?: string | null;
  minPrice?: string | null;
  coverImageUrl?: string | null;
};

export type PublisherBookListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: PublisherBookItemData[];
};

export type PublisherItemResponse = ApiResponse<PublisherItemData>;
export type PublisherListResponse = ApiResponse<PublisherListData>;
export type PublisherBookListResponse = ApiResponse<PublisherBookListData>;
