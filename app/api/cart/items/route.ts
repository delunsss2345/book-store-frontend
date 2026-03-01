import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { AddCartItemRequest } from "@/types/request/cart.request";
import { AddCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload: AddCartItemRequest = await request.json();
        const response = await api.post<AddCartItemApiResponse>("cart/items", payload);
        const res = ResponseApi.success(response.data, HttpStatusCode.Created);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart Items POST API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
