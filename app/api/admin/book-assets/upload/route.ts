import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

// POST /api/v1/admin/book-assets/upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response = await api.post("admin/book-assets/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Book Assets Upload API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
