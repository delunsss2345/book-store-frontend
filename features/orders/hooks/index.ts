import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { useCartQuery } from "@/features/cart/hooks";
import { useOrderStore } from "../store/order.store";
import { selectorSetIsOrdering } from "../selector/order.selector";
import { CreateGuestOrdersAndPaymentInput } from "@/validation/order-address/orderAddressValidation";

export const useCreateOrderGuestMutation = () => {
  const { data: cart } = useCartQuery();
  const setIsOrdering = useOrderStore(selectorSetIsOrdering);

  return useMutation({
    mutationFn: async (values: CreateGuestOrdersAndPaymentInput) => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }
      setIsOrdering(true);
      try {
       
        const response = await orderService.createOrderGuest({
          ...values,
          cartId: Number(cart.id),
        });
        return response.data;
      } finally {
        setIsOrdering(false);
      }
    },
  });
};
