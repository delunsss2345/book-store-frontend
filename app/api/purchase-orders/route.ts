import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";

export const POST = wrapperHandler(async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  const response = await api.post("purchase-orders", body);
  console.log(response.data);
  return ResponseApi.success(response.data, response.status);
});
