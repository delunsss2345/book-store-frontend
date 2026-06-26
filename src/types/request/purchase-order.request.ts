export enum PurchaseOrderStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type ApprovePurchaseOrderRequest = {
  status: PurchaseOrderStatus;
};

export type GetPurchaseOrdersQuery = {
  status?: PurchaseOrderStatus;
};

export type CreateStockImportItemRequest = {
  purchaseOrderItemId: string;
  realQuantity: number;
};

export type CreateStockImportRequest = {
  purchaseOrderId: string;
  note: string;
  items: CreateStockImportItemRequest[];
};

export type CreatePurchaseOrderItemRequest = {
  bookVariantId: number;
  quantity: number;
  unitPrice: number;
  discountPrice: number;
};

export type CreatePurchaseOrderRequest = {
  supplierId: number;
  code: string;
  note?: string;
  taxAmount?: number;
  items: CreatePurchaseOrderItemRequest[];
};
