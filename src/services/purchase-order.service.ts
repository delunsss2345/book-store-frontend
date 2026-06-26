import { http } from "@/utils/http";
import {
  PurchaseOrderDetailResponse,
  PurchaseOrderListResponse,
  PurchaseOrderResponse,
} from "@/types/response/purchase-order.response";
import {
  ApprovePurchaseOrderRequest,
  CreatePurchaseOrderRequest,
  GetPurchaseOrdersQuery,
} from "@/types/request/purchase-order.request";

export const purchaserService = {
  create: (data: CreatePurchaseOrderRequest) => {
    return http.post("/purchase-orders", data);
  },

  getAll: (query?: GetPurchaseOrdersQuery) => {
    return http.get<PurchaseOrderListResponse>("/purchase-orders", {
      params: query,
    });
  },

  getById: (id: string) => {
    return http.get<PurchaseOrderDetailResponse>(`/purchase-orders/${id}`);
  },

  approve: (id: string, data: ApprovePurchaseOrderRequest) => {
    return http.post<PurchaseOrderResponse>(
      `/purchase-orders/${id}/approve`,
      data,
    );
  },

  transferProcessing: (id: string) => {
    return http.post<PurchaseOrderResponse>(
      `/purchase-orders/${id}/transfer-processing`,
    );
  },
};
