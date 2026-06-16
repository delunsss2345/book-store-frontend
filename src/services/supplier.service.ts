import { SupplierRequest } from "@/types/request/supplier.request";
import {
  SupplierItemResponse,
  SupplierListResponse,
} from "@/types/response/supplier.response";
import { http } from "@/utils/http";

export const supplierApi = {
  getSupplier: () => http.get<SupplierListResponse>("suppliers"),

  createSupplier: (payload: SupplierRequest) =>
    http.post<SupplierItemResponse>("/suppliers", payload),

  toggleSupplierActive: (supplierId: string) =>
    http.patch<SupplierItemResponse>(`/suppliers/${supplierId}/active`, {}),
};
