import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ permissionName: string }> }
) {
    try {
        const { permissionName } = await params;
        const response = await api.get<any>(`permission/${permissionName}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
