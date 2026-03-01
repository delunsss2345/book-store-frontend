import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { AddWishItemResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload: { bookVariantId: bigint } = await request.json();
        const response = await api.raw.post<AddWishItemResponse>("wish/items", payload);
        const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
        appendSetCookies(res, response.setCookies);
        return res;
    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish Items POST API Error:", error);
        }
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
