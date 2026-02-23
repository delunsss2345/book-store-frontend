import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { WishResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await api.get<WishResponse>("wish");
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish GET API Error:", error);
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = await api.delete<WishResponse>("wish");
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish DELETE API Error:", error);
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        );
    }
}
