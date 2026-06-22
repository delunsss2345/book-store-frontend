import { ApiResponse } from "@/types/response/base.response";

export type RoleData = {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
};

export type RolePermissionData = {
  roleId: string;
  permissionId: string;
};

export type RoleListResponse = ApiResponse<RoleData[]>;
export type RoleItemResponse = ApiResponse<RoleData>;
export type RolePermissionResponse = ApiResponse<RolePermissionData>;
export type RolePermissionListResponse = ApiResponse<RolePermissionData[]>;
