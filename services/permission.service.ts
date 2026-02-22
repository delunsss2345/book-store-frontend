import type {
  CreatePermissionDTO,
  UpdatePermissionDTO,
} from "@/types/request/permission.request";
import type {
  PermissionListResponse,
  PermissionItemResponse,
} from "@/types/response/permission.response";
import { http } from "@/utils/http";

export const permissionApi = {
  getAll: () =>
    http.get<PermissionListResponse>("/permission"),

  getByName: (permissionName: string) =>
    http.get<PermissionItemResponse>(`/permission/${permissionName}`),

  create: (payload: CreatePermissionDTO) =>
    http.post<PermissionItemResponse>("/permission", payload),

  update: (id: string, payload: UpdatePermissionDTO) =>
    http.patch<PermissionItemResponse>(`/permission/${id}`, payload),

  delete: (id: string) =>
    http.del(`/permission/${id}`),
};
