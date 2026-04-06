import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async () => {
  const response = await api.get("admin/orders");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
