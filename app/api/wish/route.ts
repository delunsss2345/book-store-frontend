import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { WishResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get<WishResponse>("wish");
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});

export const DELETE = wrapperHandler(async (request: Request) => {
  const response = await api.delete<WishResponse>("wish");
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});
