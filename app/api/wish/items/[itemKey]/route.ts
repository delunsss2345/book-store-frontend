import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ itemKey: string }> }
) {
    try {
        const { itemKey } = await params;
        const response = await api.delete(`wish/items/${itemKey}`, {
            headers: { cookie: request.headers.get("cookie") || "" },
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
