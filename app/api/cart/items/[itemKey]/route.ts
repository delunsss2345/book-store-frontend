import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { CartItemKeyParam } from "@/types/request/cart.request";
import { RemoveCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const DELETE = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<CartItemKeyParam> },
  ) => {
    const { itemKey } = await params;
    const response = await api.delete<RemoveCartItemApiResponse>(
      `cart/items/${itemKey}`,
    );
    const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
    appendSetCookies(res, response.setCookies);
    return res;
  },
);
