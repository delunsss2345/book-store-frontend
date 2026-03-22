import { http } from "@/utils/http";
import {
  PurchaseOrderDetailResponse,
  PurchaseOrderListResponse,
} from "@/types/response/purchase-order.response";
import { CreatePurchaseOrderRequest } from "@/types/request/purchase-order.request";

export const purchaserService = {
  create: (data: CreatePurchaseOrderRequest) => {
    return http.post("/purchase-orders", data);
  },

  getAll: () => {
    return http.get<PurchaseOrderListResponse>("/purchase-orders");
  },

  getById: (id: string) => {
    return http.get<PurchaseOrderDetailResponse>(`/purchase-orders/${id}`);
  },
};
