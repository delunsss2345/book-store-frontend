import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";

export const POST = wrapperHandler(async (request: NextRequest) => {
  const body = await request.json();
  const response = await api.post("purchase-orders", body);
  return ResponseApi.success(response.data, response.status);
});

export const GET = wrapperHandler(async (request: NextRequest) => {
  const response = await api.get("purchase-orders");
  return ResponseApi.success(response.data, response.status);
});
