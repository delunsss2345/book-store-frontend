import { CreateStockImportRequest } from "@/types/request/purchase-order.request";
import { StockImportDetailResponse } from "@/types/response/stock-import.response";
import { http } from "@/utils/http";

export const stockImportService = {
  create: (data: CreateStockImportRequest) => {
    return http.post("/admin/stock-imports/create", data);
  },

  getByPurchaseOrderId: (purchaseOrderId: string) => {
    return http.get<StockImportDetailResponse>(
      `/admin/stock-imports/${purchaseOrderId}`,
    );
  },
};
