import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import {
  ClearCartApiResponse,
  GetCartApiResponse,
} from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get<GetCartApiResponse>("cart");
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});

export const DELETE = wrapperHandler(async (request: Request) => {
  const response = await api.delete<ClearCartApiResponse>("cart", {
    headers: { cookie: request.headers.get("cookie") || "" },
  });
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});
