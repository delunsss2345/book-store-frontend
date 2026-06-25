export enum PurchaseOrderStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type ApprovePurchaseOrderRequest = {
  status: PurchaseOrderStatus;
};

export type CreatePurchaseOrderItemRequest = {
  bookVariantId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type CreatePurchaseOrderRequest = {
  supplierId: number;
  bookId: number;
  code: string;
  createdAt: string;
  note?: string;
  discountPrice: number;
  taxAmount?: number;
  items: CreatePurchaseOrderItemRequest[];
};
