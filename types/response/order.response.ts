import { ApiResponse } from "@/types/response/base.response";
import type { OrderStatus, PaymentStatus } from "@prisma/client";

export type OrderSummary = {
  id: string;
  orderCode: string;
  userId: string | null;
  addressId: string | null;
  cartHash: string | null;
  guestSessionId: string | null;
  guestEmail: string | null;
  status: OrderStatus | null;
  paymentStatus: PaymentStatus | null;
  subtotal: string | null;
  discountAmount: string | null;
  shippingFee: string | null;
  totalAmount: string | null;
  currencyCode: string | null;
  idempotencyKey: string | null;
  placedAt: string | null;
  createdAt: string;
  expiredAt: string | null;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
};

export type OrderListResponseData = OrderSummary[];

export type OrderStatusData = {
  orderId: string;
  status: string;
};

export type CreateGuestOrderResponseData = {
  orderId: string;
  paymentUrl?: string;
};

export type OrderStatusResponse = ApiResponse<OrderStatusData>;
export type CreateGuestOrderResponse = ApiResponse<CreateGuestOrderResponseData>;
export type GetOrdersResponse = ApiResponse<OrderListResponseData>;
