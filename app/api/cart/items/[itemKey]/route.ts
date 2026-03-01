import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { CartItemKeyParam } from "@/types/request/cart.request";
import { RemoveCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<CartItemKeyParam> },
) {
    try {
        const { itemKey } = await params;
        const response = await api.delete<RemoveCartItemApiResponse>(`cart/items/${itemKey}`);
        const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart Item DELETE API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
