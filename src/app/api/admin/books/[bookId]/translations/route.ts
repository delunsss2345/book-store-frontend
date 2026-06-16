import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { HttpStatusCode } from "axios";

type BookParams = { bookId: string };

// POST /api/v1/admin/books/{bookId}/translations
export const POST = wrapperHandler<BookParams>(
  async (request: Request, { params }) => {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.post(`admin/books/${bookId}/translations`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  },
);
