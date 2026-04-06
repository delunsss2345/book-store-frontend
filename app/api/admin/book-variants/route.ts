import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AdminBookVariantListResponse } from "@/types/response/admin-book-variant.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

// GET /api/v1/admin/book-variants
export const GET = wrapperHandler(async (request: Request) => {
  const { searchParams } = request.nextUrl;
  const queryString = searchParams.toString();
  const url = queryString
    ? `admin/book-variants?${queryString}`
    : "admin/book-variants";

  const response = await api.get<AdminBookVariantListResponse>(url);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
