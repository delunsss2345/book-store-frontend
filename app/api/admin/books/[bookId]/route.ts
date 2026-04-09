import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { HttpStatusCode } from "axios";

type BookParams = { bookId: string }

export const GET = wrapperHandler<BookParams>(
  async (_request: Request, { params }) => {
    const { bookId } = await params;
    const response = await api.get(`admin/books/${bookId}`);
    console.log(response);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);

export const PATCH = wrapperHandler<BookParams>(
  async (request: Request, { params }) => {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.patch(`admin/books/${bookId}`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);

  },
);

// DELETE /api/v1/admin/books/{bookId}
export const DELETE = wrapperHandler<BookParams>(
  async (_request: Request, { params }) => {
    const { bookId } = await params;
    const response = await api.delete(`admin/books/${bookId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);

  },
);
