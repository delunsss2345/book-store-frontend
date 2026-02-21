import { CreateGuestOrdersAndPaymentInput } from "@/validation/order-address/orderAddressValidation";
import { http } from "@/utils/http";

export type CreateOrderGuestRequest = CreateGuestOrdersAndPaymentInput & {
  cartId: number;
  idempotencyKey : string
};

export const orderService = {
  async createOrderGuest(payload: CreateOrderGuestRequest) {
    const response = await http.post("orders/guest/checkout", payload);
    
    return response;
  },
};
