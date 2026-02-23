import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AddCartItemRequest } from "@/types/request/cart.request";
import { AddCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload: AddCartItemRequest = await request.json();
        const response = await api.post<AddCartItemApiResponse>("cart/items", payload);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : API_MESSAGE.SYSTEM_TRY_AGAIN;

        if (process.env.NODE_ENV === "development") {
            console.error("Cart Items POST API Error:", error);
        }

        return ResponseApi.error(
            message,
            HttpStatusCode.BadRequest,  
        );
    }
}
