import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { GetMeResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const header = await headers()  ;
        const accessToken = header.get("Authorization")?.split(" ")[1];
        const response = await api.get<GetMeResponse>("auth/me" , {
            headers : {
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        if(error?.status === HttpStatusCode.Unauthorized){
            return ResponseApi.error(error.message, HttpStatusCode.Unauthorized);
        }
        return ResponseApi.error(error.message, HttpStatusCode.BadRequest);
    }
}
