import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string; id: string }> }
) {
    try {
        const { userId, id } = await params;
        const payload = await request.json();
        const response = await api.patch<any>(`user-address/user/${userId}/${id}`, payload);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string; id: string }> }
) {
    try {
        const { userId, id } = await params;
        const response = await api.delete<any>(`user-address/user/${userId}/${id}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
