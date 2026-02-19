import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import {
    ClearCartApiResponse,
    GetCartApiResponse,
} from "@/types/response/cart.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const guestSessionId = cookieStore.get("guestSessionId")?.value || "";
        const response = await api.get<GetCartApiResponse>("cart", {
            headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
            cache: "no-store",
            });

       if(response.data.guestSessionId && !guestSessionId) {
          cookieStore.set("guestSessionId", response.data.guestSessionId);
       }
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : API_MESSAGE.SYSTEM_TRY_AGAIN;

        if (process.env.NODE_ENV === "development") {
            console.error("Cart GET API Error:", error);
        }

        return ResponseApi.error(
            message,
            HttpStatusCode.BadRequest,
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = await api.delete<ClearCartApiResponse>("cart", {
            headers: { cookie: request.headers.get("cookie") || "" },
        });
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : API_MESSAGE.SYSTEM_TRY_AGAIN;

        if (process.env.NODE_ENV === "development") {
            console.error("Cart DELETE API Error:", error);
        }

        return ResponseApi.error(
            message,
            HttpStatusCode.BadRequest,
        );
    }
}

