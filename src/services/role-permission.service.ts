import type { CreateRolePermissionDTO } from "@/types/request/role-permission.request";
import type {
  RolePermissionResponse,
  RolePermissionListResponse,
} from "@/types/response/role.response";
import { http } from "@/utils/http";

export const rolePermissionApi = {
  create: (payload: CreateRolePermissionDTO) =>
    http.post<RolePermissionResponse>("/role-permission", payload),

  getByRole: (roleId: string) =>
    http.get<RolePermissionListResponse>(`/role-permission/role/${roleId}`),

  getByPermission: (permissionId: string) =>
    http.get<RolePermissionListResponse>(`/role-permission/permission/${permissionId}`),
};
