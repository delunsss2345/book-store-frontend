import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ bookId: string }> };

// POST /api/v1/admin/books/{bookId}/translations
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.post(`admin/books/${bookId}/translations`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Book Translations API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
