import type {
  CreateUserAddressDTO,
  UpdateUserAddressDTO,
} from "@/types/request/user-address.request";
import type {
  UserAddressListResponse,
  UserAddressItemResponse,
  UserDeleteAddressResponse,
} from "@/types/response/user-address.response";
import { http } from "@/utils/http";

export const userAddressApi = {
  getByUser: () =>
    http.get<UserAddressListResponse>(`/user-address/user`),

  create: (payload: CreateUserAddressDTO) =>
    http.post<UserAddressItemResponse>(`/user-address/user`, payload),

  update: (id: string, payload: UpdateUserAddressDTO) =>
    http.patch<UserAddressItemResponse>(`/user-address/user/${id}`, payload),

  setDefault: (id: string) =>
    http.patch<UserAddressItemResponse>(`/user-address/user/${id}/set-default`, {}),

  delete: (id: string) =>
    http.del<UserDeleteAddressResponse>(`/user-address/user/${id}`),
};
