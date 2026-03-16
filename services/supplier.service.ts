import { SupplierListResponse } from "@/types/response/supplier.response";
import { http } from "@/utils/http";

export const supplierApi = {
  getSupplier: () => http.get<SupplierListResponse>("suppliers"),
};
