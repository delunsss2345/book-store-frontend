import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const response = await api.get<any>(`user-address/user/${userId}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const payload = await request.json();
        const response = await api.post<any>(`user-address/user/${userId}`, payload);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
