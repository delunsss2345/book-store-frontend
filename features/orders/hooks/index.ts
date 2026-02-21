import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { useCartQuery } from "@/features/cart/hooks";
import { useOrderStore } from "../store/order.store";
import { selectorSetIsOrdering } from "../selector/order.selector";
import { CreateGuestOrdersAndPaymentInput } from "@/validation/order-address/orderAddressValidation";
import { v4 as uuidv4 } from "uuid";

export const useCreateOrderGuestMutation = () => {
  const { data: cart } = useCartQuery();
  const setIsOrdering = useOrderStore(selectorSetIsOrdering);
  // Lưu vào storage nếu order cũ checkout thì cứ thanh toán cái cũ (chưa fix)
  const idempotencyKey = useOrderStore((state) => state.idempotencyKey);
  const setIdempotencyKey = useOrderStore((state) => state.setIdempotencyKey);

  return useMutation({
    mutationFn: async (values: CreateGuestOrdersAndPaymentInput) => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }
      setIsOrdering(true);
      try {
        if(!idempotencyKey) {
          setIdempotencyKey(uuidv4())
        }
        const response = await orderService.createOrderGuest({
          ...values,
          idempotencyKey,
          cartId: Number(cart.id),
        });
        return response.data;
      } finally {
        setIsOrdering(false);
      }
    },
  });
};
