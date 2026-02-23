import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CartItemKeyParam } from "@/types/request/cart.request";
import { RemoveCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<CartItemKeyParam> },
) {
    try {
        const { itemKey } = await params;
        const response = await api.delete<RemoveCartItemApiResponse>(`cart/items/${itemKey}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart Item DELETE API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
