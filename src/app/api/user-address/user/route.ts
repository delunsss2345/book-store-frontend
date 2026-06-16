import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import {
  UserAddressItemResponse,
  UserAddressListResponse,
} from "@/types/response/user-address.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get<UserAddressListResponse>(`user-address/user`);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const response = await api.post<UserAddressItemResponse>(
    `user-address/user`,
    payload,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
