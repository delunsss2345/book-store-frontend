import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AddCartItemRequest } from "@/types/request/cart.request";
import { AddCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const payload: AddCartItemRequest = await request.json();
        
        const guestSessionId = cookieStore.get("guestSessionId")?.value || "";
        const response = await api.post<AddCartItemApiResponse>("cart/items", payload, {
            headers: { Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "" },
        });
        
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
