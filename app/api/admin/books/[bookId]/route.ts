import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

type Params = { params: Promise<{ bookId: string }> };

// GET /api/v1/admin/books/{bookId}
export const GET = wrapperHandler<Params>(
  async (_request: Request, { params }: Params) => {
    const { bookId } = await params;
    const response = await api.get(`admin/books/${bookId}`);
    console.log(response);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);

// PATCH /api/v1/admin/books/{bookId}
export const PATCH = wrapperHandler<Params>(
  async (request: Request, { params }: Params) => {
    const { bookId } = await params;
    const body = await request.json();
    const response = await api.patch(`admin/books/${bookId}`, body);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
);

// DELETE /api/v1/admin/books/{bookId}
export const DELETE = wrapperHandler<Params>(
  async (_request: Request, { params }: Params) => {
    const { bookId } = await params;
    const response = await api.delete(`admin/books/${bookId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
);
