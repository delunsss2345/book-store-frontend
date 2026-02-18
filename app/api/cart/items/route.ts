import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AddItemRequest } from "@/types/request/catalog.request";
import { AddItemResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload: AddItemRequest = await request.json();
        const response = await api.post<AddItemResponse>("cart/items", payload)
        return ResponseApi.success(response.data, HttpStatusCode.Ok)
    }
    catch (error) {
        return ResponseApi.error(
            error.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        )
    }
}