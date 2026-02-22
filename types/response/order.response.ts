import { ApiResponse } from "@/types/response/base.response";

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
