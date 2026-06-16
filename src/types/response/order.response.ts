import type { OrderStatus, PaymentStatus } from "@/src/constants/enums/order";
import { ProxyResponse } from "@/types/response/base.response";

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

export type OrderStatusData = {
  orderId: string;
  status: string;
};
export type CreateGuestOrderResponseData = {
  id: string;
  orderId: string;
  gateway: string;
  orderCode: string;
  status: string;
  paymentUrl: string;
  expiredAt: Date;
  tokenUrl: string;
  totalAmount: string;
  bankName: string;
  stk: string;
  content: string;
  nameAccount: string;
};

export type CreateUserOrder = {
  orderCode: string;
  orderId: string;
  subtotal: number;
  totalAmount: number;
};

export type OrderStatusResponse = ProxyResponse<OrderStatusData>;
export type CreateGuestOrderResponse =
  ProxyResponse<CreateGuestOrderResponseData>;
export type GetUserOrdersResponse = ProxyResponse<OrderListResponseData>;
export type CreateUserOrderResponse = ProxyResponse<CreateUserOrder>;

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

export type GetOrderItemsResponse = ProxyResponse<OrderItemListData>;
