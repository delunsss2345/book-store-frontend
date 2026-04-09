import { useCartQuery } from "@/features/cart/hooks";
import { orderService } from "@/services/order.service";
import { CreateGuestOrdersAndPaymentInput, CreateUserOrdersAndPaymentInput } from "@/validation/order-address/orderAddressValidation";
import { useMutation } from "@tanstack/react-query";
import { selectorSetIsOrdering } from "../selector/order.selector";
import { useOrderStore } from "../store/order.store";
import { useQueryOrder } from "./use-query-orders";

export const useCreateOrderGuestMutation = () => {
  const { data: cart } = useCartQuery();
  const queryOrder = useQueryOrder();
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
          languageCode: "vi",
        });
        return response.data;
      } finally {
        setIsOrdering(false);
      }
    },
    onSuccess: () => {
      queryOrder.refetch();
    },
  });
};

export const useCreateOrderUserMutation = () => {
  const { data: cart } = useCartQuery();
  const setIsOrdering = useOrderStore(selectorSetIsOrdering);

  return useMutation({
    mutationFn: async (values: CreateUserOrdersAndPaymentInput) => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }
      setIsOrdering(true);
      try {
        console.log({
          ...values,
          cartId: Number(cart.id),
          languageCode: "vi",
        });
        const response = await orderService.createOrderUser({
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

export * from "./use-query-order-items";
export * from "./use-query-orders";

