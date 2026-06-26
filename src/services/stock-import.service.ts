import { CreateStockImportRequest } from "@/types/request/purchase-order.request";
import { http } from "@/utils/http";

export const stockImportService = {
  create: (data: CreateStockImportRequest) => {
    return http.post("/admin/stock-imports/create", data);
  },
};
