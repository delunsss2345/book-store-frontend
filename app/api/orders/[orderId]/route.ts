import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";
import { GetOrderItemsResponse } from "@/types/response/order.response";

export const GET = wrapperHandler(async (request: NextRequest, { params }) => {
  const { orderId } = await params;
  const response = await api.get<GetOrderItemsResponse>(`orders/${orderId}`);
  return ResponseApi.success(response.data, response.status);
});
