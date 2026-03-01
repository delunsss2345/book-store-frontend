import { PER_PAGE } from "@/constants/pagination";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HomeResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";
export async function GET() {
    try {
        const response = await api.get<HomeResponse>(`catalog/home?limit=${PER_PAGE}`)
        return ResponseApi.success(response.data);
    }
    catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Login API Error:", error);
        }
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
