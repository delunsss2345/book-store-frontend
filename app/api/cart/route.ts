import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import {
    ClearCartApiResponse,
    GetCartApiResponse,
} from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await api.raw.get<GetCartApiResponse>("cart");
        const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart GET API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = await api.raw.delete<ClearCartApiResponse>("cart", {
            headers: { cookie: request.headers.get("cookie") || "" },
        });
        const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart DELETE API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
