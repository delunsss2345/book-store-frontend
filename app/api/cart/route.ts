import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";
import { CartResponse } from '../../../types/response/cart.response';

export async function POST(request: NextRequest) {
    try {



    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        )
    }
}

export async function GET() {
    try {
        const response = await api.get<CartResponse>("cart")
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Register API Error:", error);
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        )
    }
}

