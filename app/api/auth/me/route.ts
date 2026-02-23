import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { GetMeResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await api.get<GetMeResponse>("auth/me");
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        if(error?.status === HttpStatusCode.Unauthorized){
            return ResponseApi.error(error.message, HttpStatusCode.Unauthorized);
        }
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
