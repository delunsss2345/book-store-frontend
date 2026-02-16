import { API_MESSAGE } from "@/constants/api/messageApi";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { GetBookDetailResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await ctx.params;
        console.log(slug);
        const response = await api.get<GetBookDetailResponse>(`catalog/books/slug/${slug}?lang=vi`);
        return ResponseApi.success(response.data);
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Get book detail API Error:", error);
        }
        return ResponseApi.error(API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest);
    }
}
