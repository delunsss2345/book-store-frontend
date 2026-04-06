import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { GetBookDetailResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(
  async (_req: Request, ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;
    const response = await api.get<GetBookDetailResponse>(
      `catalog/books/slug/${slug}`,
    );
    return ResponseApi.success(response.data);
  },
);
