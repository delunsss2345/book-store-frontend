import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";
import { PurchaseOrderDetailResponse } from "@/types/response/purchase-order.response";

export const GET = wrapperHandler(async (request: NextRequest, { params }) => {
  const { purchaseOrderId } = await params;
  const response = await api.get<PurchaseOrderDetailResponse>(
    `purchase-orders/${purchaseOrderId}`,
  );
  return ResponseApi.success(response.data, response.status);
});
