import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const response = await api.get<any>(`search?${searchParams.toString()}`);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
