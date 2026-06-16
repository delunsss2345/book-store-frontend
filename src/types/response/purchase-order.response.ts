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

type PurchaseOrderDetailItem = {
  id: string;
  purchaseOrderId: string;
  bookVariantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  format: string;
};

type PurchaseOrderDetail = {
  items: PurchaseOrderDetailItem[];
};

type PurchaseOrderListData = PaginationResponse<PurchaseOrderItem>;
type PurchaseOrderDetailData = PaginationResponse<PurchaseOrderDetailItem>;

type PurchaseOrderListResponse = ProxySuccessResponse<PurchaseOrderListData>;
type PurchaseOrderDetailResponse =
  ProxySuccessResponse<PurchaseOrderDetailData>;
type PurchaseOrderResponse = ProxySuccessResponse<PurchaseOrderItem>;

export type {
  PurchaseOrderSupplier,
  PurchaseOrderItem,
  PurchaseOrderListData,
  PurchaseOrderListResponse,
  PurchaseOrderResponse,
  PurchaseOrderDetail,
  PurchaseOrderDetailData,
  PurchaseOrderDetailItem,
  PurchaseOrderDetailResponse,
};
