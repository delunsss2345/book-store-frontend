import { ApiResponse } from "@/types/response/base.response";
import type { OrderStatus, PaymentStatus } from "@/constants/enums/order";

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

// ── Order items (GET orders/:orderId) ─────────────────────────────────────────

export type OrderItemBookTranslation = {
  title: string;
  slug: string;
};

export type OrderItemBook = {
  coverImageUrl: string;
  id: string;
  translations: OrderItemBookTranslation[];
};

export type OrderItemBookVariant = {
  book: OrderItemBook;
};

export type OrderItemBookVariantSnapshot = {
  priceSnapshot: string;
  bookVariantId: string;
  bookVariant: OrderItemBookVariant;
};

export type OrderItem = {
  quantity: number;
  bookVariantSnapshotId: string;
  bookVariantSnapshot: OrderItemBookVariantSnapshot;
};

export type OrderItemListData = OrderItem[];

export type GetOrderItemsResponse = ApiResponse<OrderItemListData>;
