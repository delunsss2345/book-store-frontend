import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ bookId: string }> };

// PATCH /api/v1/admin/books/{bookId}
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.patch(`admin/books/${bookId}`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Update Book API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}

// DELETE /api/v1/admin/books/{bookId}
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { bookId } = await params;
    const response = await api.delete(`admin/books/${bookId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Delete Book API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
