import { ApiResponse } from "@/types/response/base.response";

export type CategoryItemData = {
  id: string;
  parentId: string | null;
  name: string;
  slug: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type CategoryListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: CategoryItemData[];
};

export type CategoryItemResponse = ApiResponse<CategoryItemData>;
export type CategoryListResponse = ApiResponse<CategoryListData>;
