import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import {
  CartItemKeyParam,
  UpdateCartItemDeltaRequest,
} from "@/types/request/cart.request";
import { UpdateCartItemDeltaApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const PATCH = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<CartItemKeyParam> },
  ) => {
    const { itemKey } = await params;
    const payload: UpdateCartItemDeltaRequest = await request.json();

    const response = await api.patch<UpdateCartItemDeltaApiResponse>(
      `cart/items/${itemKey}/delta`,
      payload,
    );

    const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
    appendSetCookies(res, response.setCookies);
    return res;
  },
);
