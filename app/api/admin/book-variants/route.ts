import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { AdminBookVariantListResponse } from "@/types/response/admin-book-variant.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

// GET /api/v1/admin/book-variants
export const GET = wrapperHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const queryString = searchParams.toString();
  const url = queryString
    ? `admin/book-variants?${queryString}`
    : "admin/book-variants";

  const response = await api.get<AdminBookVariantListResponse>(url);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
