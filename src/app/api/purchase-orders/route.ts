import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
export const POST = wrapperHandler(async (request: Request) => {
  const body = await request.json();
  const response = await api.post("purchase-orders", body);
  return ResponseApi.success(response.data, response.status);
});

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get("purchase-orders");
  return ResponseApi.success(response.data, response.status);
});
