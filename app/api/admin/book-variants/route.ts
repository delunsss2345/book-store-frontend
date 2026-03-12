import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AdminBookVariantListResponse } from "@/types/response/admin-book-variant.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

// GET /api/v1/admin/book-variants
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const queryString = searchParams.toString();
    const url = queryString
      ? `admin/book-variants?${queryString}`
      : "admin/book-variants";

    const response =
      await api.get<AdminBookVariantListResponse>(url);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Book Variants API Error:", error);
    }
    const message =
      error instanceof Error ? error.message : "Unknown error";
    const status =
      (error as { status?: number }).status ?? HttpStatusCode.BadRequest;
    return ResponseApi.error(message, status);
  }
}
