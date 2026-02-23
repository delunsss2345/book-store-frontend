import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AddWishItemResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload: { bookVariantId: bigint } = await request.json();
        const response = await api.post<AddWishItemResponse>("wish/items", payload);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish Items POST API Error:", error);
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        );
    }
}
