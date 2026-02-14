import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { LogoutResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        const response = await api.post<LogoutResponse>("auth/logout", {
            refreshToken
        });

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