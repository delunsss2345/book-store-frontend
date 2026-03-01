import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import {
    CartItemKeyParam,
    UpdateCartItemDeltaRequest,
} from "@/types/request/cart.request";
import { UpdateCartItemDeltaApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<CartItemKeyParam> },
) {
    try {
        const { itemKey } = await params;
        const payload: UpdateCartItemDeltaRequest = await request.json();

        const response = await api.raw.patch<UpdateCartItemDeltaApiResponse>(
            `cart/items/${itemKey}/delta`,
            payload
        );

        const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart Item Delta PATCH API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
