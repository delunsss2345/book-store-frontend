import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { PurchaseOrderDetailResponse } from "@/types/response/purchase-order.response";

type PurchaseOrderIdParams = { purchaseOrderId: string };

export const GET = wrapperHandler<PurchaseOrderIdParams>(async (request: Request, { params }) => {
  const { purchaseOrderId } = await params;
  const response = await api.get<PurchaseOrderDetailResponse>(
    `purchase-orders/${purchaseOrderId}`,
  );
  return ResponseApi.success(response.data, response.status);
});
