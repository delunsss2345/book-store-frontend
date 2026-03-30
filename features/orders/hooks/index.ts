import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { useCartQuery } from "@/features/cart/hooks";
import { useOrderStore } from "../store/order.store";
import { selectorSetIsOrdering } from "../selector/order.selector";
import { CreateGuestOrdersAndPaymentInput } from "@/validation/order-address/orderAddressValidation";
import { CreateUserOrdersAndPaymentDTO } from "@/types/request/order.request";
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
    mutationFn: async (values: CreateUserOrdersAndPaymentDTO) => {
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

export * from "./use-query-orders";
export * from "./use-query-order-items";
