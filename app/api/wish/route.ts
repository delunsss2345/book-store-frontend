import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { WishResponse } from "@/types/response/wish.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const guestSessionId = cookieStore.get("guestSessionId")?.value;
        const response = await api.get<WishResponse>("wish", {
             headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
            cache: "no-store",
        });
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
        const cookieStore = await cookies();
        const guestSessionId = cookieStore.get("guestSessionId")?.value;
        const response = await api.delete<WishResponse>("wish", {
            headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
        });
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
