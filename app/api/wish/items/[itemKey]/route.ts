import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ itemKey: string }> }
) {
    try {
        const { itemKey } = await params;
        const cookieStore = await cookies();
        const guestSessionId = cookieStore.get("guestSessionId")?.value;
        const response = await api.delete(`wish/items/${itemKey}`, {
            headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
        });
        return ResponseApi.success(response, HttpStatusCode.Ok);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish Item DELETE API Error:", error);
        }
        return ResponseApi.error(
            error?.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
        );
    }
}
