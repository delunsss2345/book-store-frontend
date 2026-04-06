import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import type { AdminCategoryStats } from "@/types/response/admin.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async () => {
  const response = await api.get<AdminCategoryStats>("admin/categories/stats");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
