import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CartItemKeyParam } from "@/types/request/cart.request";
import { RemoveCartItemApiResponse } from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<CartItemKeyParam> },
) {
    try {
        const { itemKey } = await params;
        const cookieStore = await cookies();
        const guestSessionId = cookieStore.get("guestSessionId")?.value || "";

        const response = await api.delete<RemoveCartItemApiResponse>(`cart/items/${itemKey}`, {
            headers: { cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "" },
        });
      
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : API_MESSAGE.SYSTEM_TRY_AGAIN;

        if (process.env.NODE_ENV === "development") {
            console.error("Cart Item DELETE API Error:", error);
        }

        return ResponseApi.error(
            message,
            HttpStatusCode.BadRequest,
        );
    }
}
