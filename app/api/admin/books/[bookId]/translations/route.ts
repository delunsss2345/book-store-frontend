import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

type Params = { params: Promise<{ bookId: string }> };

// POST /api/v1/admin/books/{bookId}/translations
export const POST = wrapperHandler<Params>(
  async (request: Request, { params }: Params) => {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.post(`admin/books/${bookId}/translations`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Created);
  },
);
