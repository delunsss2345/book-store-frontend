import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const response = await api.post<any>("role-permission", payload);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error: any) {
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
