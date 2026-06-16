import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

// GET /api/v1/admin/users/non-customer
export const GET = wrapperHandler(async () => {
  const response = await api.get("admin/users/non-customer");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
