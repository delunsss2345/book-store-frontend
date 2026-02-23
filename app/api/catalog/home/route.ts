import { API_MESSAGE } from "@/constants/api/messageApi";
import { PER_PAGE } from "@/constants/pagination";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HomeResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
export async function GET() {
    try {
        const cookieStore = await cookies()
        const lang = cookieStore.get('appLanguage')?.value || 'vi'
        const response = await api.get<HomeResponse>(`catalog/home?limit=${PER_PAGE}&lang=${lang}`)
        return ResponseApi.success(response.data);
    }
    catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Login API Error:", error);
        }
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}