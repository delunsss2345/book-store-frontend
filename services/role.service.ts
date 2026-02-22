import type {
  RoleListResponse,
  RoleItemResponse,
} from "@/types/response/role.response";
import { http } from "@/utils/http";

export const roleApi = {
  getAll: () =>
    http.get<RoleListResponse>("/role"),

  getByName: (name: string) =>
    http.get<RoleItemResponse>(`/role/${name}`),
};
