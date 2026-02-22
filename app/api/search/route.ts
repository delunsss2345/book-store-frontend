import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const response = await api.get<any>(`search?${searchParams.toString()}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
