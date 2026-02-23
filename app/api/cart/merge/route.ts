import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { MergeCartRequest } from "@/types/request/cart.request";
import { MergeCartApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        let payload: MergeCartRequest = {};

        try {
            payload = await request.json();
        } catch {
            payload = {};
        }

        const requestBody =
            typeof payload === "object" && payload !== null ? payload : {};
        const response = await api.post<MergeCartApiResponse>("cart/merge", requestBody);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Cart Merge POST API Error:", error);
        }

        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
