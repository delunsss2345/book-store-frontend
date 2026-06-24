import type { OrderStatus, PaymentStatus } from "@/src/constants/enums/order";
import { ProxyResponse } from "@/types/response/base.response";

// ─── Order list ──────────────────────────────────────────────────────────────

export type OrderSummary = {
  id: string;
  orderCode: string;
  userId: string | null;
  addressId: string | null;
  status: OrderStatus | null;
  currencyCode: string | null;
  paymentStatus: PaymentStatus | null;
  subtotal: string | null;
  discountAmount: string | null;
  shippingFee: string | null;
  totalAmount: string | null;
  expiredAt: string | null;
  createdAt: string;
};

export type OrderListResponseData = OrderSummary[];

// ─── Checkout responses ───────────────────────────────────────────────────────

/** Returned for COD orders */
export type CheckoutCODData = {
  orderId: number;
  subtotal: number;
  totalAmount: number;
  orderCode: string;
};

/** Returned for online gateway orders (VNPAY / MOMO / etc.) */
export type CheckoutOnlineData = {
  orderId: number;
  subtotal: number;
  totalAmount: number;
  orderCode: string;
  paymentUrl: string;
  /** Short token used to navigate to the payment status page */
  tokenUrl?: string;
  expiredAt?: string;
};

/** Union of all possible checkout responses */
export type CheckoutResponseData = CheckoutCODData | CheckoutOnlineData;

export type CheckoutResponse = ProxyResponse<CheckoutResponseData>;

// ─── Payment QR (GET /payments/:tokenUrl/qr) ─────────────────────────────────

export type PaymentQrData = {
  orderId: string;
  gateway: string;
  orderCode: string;
  status: string;
  paymentUrl: string;
  expiredAt: string;
  tokenUrl: string;
  totalAmount: string;
  bankName: string;
  stk: string;
  content: string;
  nameAccount: string;
};

export type PaymentQrResponse = ProxyResponse<PaymentQrData>;

// ─── Order status ─────────────────────────────────────────────────────────────

export type OrderStatusData = {
  orderId: string;
  status: string;
};

export type OrderStatusResponse = ProxyResponse<OrderStatusData>;

// ─── Order items ──────────────────────────────────────────────────────────────

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

export type GetUserOrdersResponse = ProxyResponse<OrderListResponseData>;
export type GetOrderItemsResponse = ProxyResponse<OrderItemListData>;
