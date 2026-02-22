import type {
  CreateUserAddressDTO,
  UpdateUserAddressDTO,
} from "@/types/request/user-address.request";
import type {
  UserAddressListResponse,
  UserAddressItemResponse,
} from "@/types/response/user-address.response";
import { http } from "@/utils/http";

export const userAddressApi = {
  getByUser: (userId: string) =>
    http.get<UserAddressListResponse>(`/user-address/user/${userId}`),

  create: (userId: string, payload: CreateUserAddressDTO) =>
    http.post<UserAddressItemResponse>(`/user-address/user/${userId}`, payload),

  update: (userId: string, id: string, payload: UpdateUserAddressDTO) =>
    http.patch<UserAddressItemResponse>(`/user-address/user/${userId}/${id}`, payload),

  setDefault: (userId: string, id: string) =>
    http.patch<UserAddressItemResponse>(`/user-address/user/${userId}/${id}/set-default`, {}),

  delete: (userId: string, id: string) =>
    http.del(`/user-address/user/${userId}/${id}`),
};
