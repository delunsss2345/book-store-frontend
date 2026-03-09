import { ApiResponse, PaginationResponse } from "./base.response";

type SupplierItem = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type SupplierListData = PaginationResponse<SupplierItem>;
type SupplierListResponse = ApiResponse<SupplierListData>;
type SupplierItemResponse = ApiResponse<SupplierItem>;

export type {
  SupplierItem,
  SupplierListData,
  SupplierListResponse,
  SupplierItemResponse,
};
