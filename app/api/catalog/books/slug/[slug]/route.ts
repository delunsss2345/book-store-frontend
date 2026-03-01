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
        const response = await api.get<GetBookDetailResponse>(`catalog/books/slug/${slug}`);
        return ResponseApi.success(response.data);
    } catch (error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("Get book detail API Error:", error);
        }
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
