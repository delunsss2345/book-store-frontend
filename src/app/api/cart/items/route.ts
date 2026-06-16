import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { AddCartItemRequest } from "@/types/request/cart.request";
import { AddCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload: AddCartItemRequest = await request.json();
  const response = await api.post<AddCartItemApiResponse>(
    "cart/items",
    payload,
  );
  const res = ResponseApi.success(response.data, HttpStatusCode.Created);
  appendSetCookies(res, response.setCookies);
  return res;
});
