import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { AddWishItemResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload: { bookVariantId: bigint } = await request.json();
  const response = await api.post<AddWishItemResponse>("wish/items", payload);
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});
