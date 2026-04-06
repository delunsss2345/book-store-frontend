import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async () => {
  const response = await api.get<any>("authors");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const response = await api.post<any>("authors", payload);
  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
