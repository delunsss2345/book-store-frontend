import { ApiResponse } from "@/types/response/base.response";

export type PermissionItemData = {
  id: string;
  code: string;
  description?: string;
  method: string;
  pathPattern: string;
  isActive: boolean;
};

export type PermissionListResponse = ApiResponse<PermissionItemData[]>;
export type PermissionItemResponse = ApiResponse<PermissionItemData>;
