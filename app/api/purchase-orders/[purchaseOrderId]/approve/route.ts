import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { PurchaseOrderResponse } from "@/types/response/purchase-order.response";
import { NextRequest } from "next/server";

export const POST = wrapperHandler(async (request: NextRequest, { params }) => {
  const { purchaseOrderId } = await params;
  const body = await request.json();
  const response = await api.post<PurchaseOrderResponse>(
    `purchase-orders/${purchaseOrderId}/approve`,
    body,
  );
  return ResponseApi.success(response.data, response.status);
});
