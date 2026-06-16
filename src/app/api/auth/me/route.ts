import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { GetMeResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get<GetMeResponse>("auth/me");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
