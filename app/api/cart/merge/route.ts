import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { MergeCartRequest } from "@/types/request/cart.request";
import { MergeCartApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  let payload: MergeCartRequest = {};

  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const requestBody =
    typeof payload === "object" && payload !== null ? payload : {};
  const response = await api.post<MergeCartApiResponse>(
    "cart/merge",
    requestBody,
  );
  const res = ResponseApi.success(response.data, HttpStatusCode.Created);
  appendSetCookies(res, response.setCookies);
  return res;
});
