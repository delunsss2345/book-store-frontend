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
  const buyNow = useOrderStore((state) => state.buyNow);

  return useMutation({
    mutationFn: async (values: CreateGuestOrdersAndPaymentInput) => {
      if (!cart?.id && !buyNow) {
        throw new Error("Cart not found");
      }
      setIsOrdering(true);
      try {
        const payload: any = {
          ...values,
          languageCode: "vi",
        };
        if (buyNow) {
          payload.buyNowItem = {
            bookVariantId: Number(buyNow.variant.id),
            quantity: buyNow.quantity,
          };
        } else {
          payload.cartId = Number(cart?.id);
        }
        
        const response = await orderService.createOrderGuest(payload);
        return response.data!;
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
  const buyNow = useOrderStore((state) => state.buyNow);

  return useMutation({
    mutationFn: async (values: CreateUserOrdersAndPaymentInput) => {
      if (!cart?.id && !buyNow) {
        throw new Error("Cart not found");
      }
      setIsOrdering(true);
      try {
        const payload: any = {
          ...values,
        };
        if (buyNow) {
          payload.buyNowItem = {
            bookVariantId: Number(buyNow.variant.id),
            quantity: buyNow.quantity,
          };
        } else {
          payload.cartId = Number(cart?.id);
        }

        console.log("Create Order Payload:", payload);
        const response = await orderService.createOrderUser(payload);
        return response.data;
      } finally {
        setIsOrdering(false);
      }
    },
  });
};

export * from "./use-query-order-items";
export * from "./use-query-orders";

