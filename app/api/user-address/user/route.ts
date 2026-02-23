import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { UserAddressItemResponse, UserAddressListResponse } from "@/types/response/user-address.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
) {
    try {
        const response = await api.get<UserAddressListResponse>(`user-address/user`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}

export async function POST(
    request: NextRequest,
) {
    try {
        const payload = await request.json();
        const response = await api.post<UserAddressItemResponse>(`user-address/user`, payload);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error: any) {
        return ResponseApi.error(error.message,error.status ?? HttpStatusCode.BadRequest);
    }
}
