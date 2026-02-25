import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

// GET /api/v1/admin/books
export async function GET() {
  try {
    const response = await api.get("admin/books");
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Get Books API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}

// POST /api/v1/admin/books
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("admin/books", body);
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Create Book API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
