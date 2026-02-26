import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AdminBookResponse } from "@/types/response/admin.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post<AdminBookResponse>("admin/books/all", body);
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Create Book All API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
