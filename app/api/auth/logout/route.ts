import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { LogoutResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log(request);
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        cookieStore.delete("refreshToken");
        cookieStore.delete("guestSessionId");

        const response = await api.post<LogoutResponse>("auth/logout", {
            refreshToken
        });
        console.log(response);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    }
    catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Refresh Token API Error:", error);
        }
        return ResponseApi.error(
            API_MESSAGE.SYSTEM_TRY_AGAIN,
            HttpStatusCode.BadRequest,
        );
    }
}