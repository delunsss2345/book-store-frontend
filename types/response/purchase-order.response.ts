import { ProxySuccessResponse, PaginationResponse } from "./base.response";

type PurchaseOrderSupplier = {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type PurchaseOrderItem = {
  id: string;
  supplierId: string;
  code: string;
  status: "PENDING" | "APPROVED" | "RECEIVED" | "CANCELLED";
  note: string;
  totalAmount: string;
  taxAmount: string;
  createdAt: string;
  updatedAt: string;
  supplier: PurchaseOrderSupplier;
};

type PurchaseOrderListData = PaginationResponse<PurchaseOrderItem>;

type PurchaseOrderListResponse = ProxySuccessResponse<PurchaseOrderListData>;
type PurchaseOrderResponse = ProxySuccessResponse<PurchaseOrderItem>;

export type {
  PurchaseOrderSupplier,
  PurchaseOrderItem,
  PurchaseOrderListData,
  PurchaseOrderListResponse,
  PurchaseOrderResponse,
};
