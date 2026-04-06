import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { AdminBookResponse } from "@/types/response/admin.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const body = await request.json();
  const response = await api.post<AdminBookResponse>("admin/books/all", body);
  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
