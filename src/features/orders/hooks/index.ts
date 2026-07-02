import { useCartQuery } from "@/features/cart/hooks";
import { orderService } from "@/services/order.service";
import type { CheckoutItem } from "@/types/request/order.request";
import type { CheckoutResponseData } from "@/types/response/order.response";
import type {
  GuestCheckoutInput,
  UserCheckoutInput,
} from "@/validation/order-address/orderAddressValidation";
import { useMutation } from "@tanstack/react-query";
import { selectorSetIsOrdering } from "../selector/order.selector";
import { useOrderStore } from "../store/order.store";
import { useQueryOrder } from "./use-query-orders";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build the items array from the cart or the buyNow item. */
function resolveItems(
  storeItems: { bookVariantId: number; quantity: number }[],
  buyNow: { variant: { id: string | number }; quantity: number } | null,
): CheckoutItem[] {
  if (buyNow) {
    return [{ bookVariantId: Number(buyNow.variant.id), quantity: buyNow.quantity }];
  }
  return storeItems;
}

// ─── Guest checkout mutation ──────────────────────────────────────────────────

export const useCheckoutGuestMutation = () => {
  const queryOrder = useQueryOrder();
  const setIsOrdering = useOrderStore(selectorSetIsOrdering);
  const buyNow = useOrderStore((state) => state.buyNow);
  const storeItems = useOrderStore((state) => state.items);

  return useMutation<CheckoutResponseData, Error, GuestCheckoutInput>({
    mutationFn: async (values) => {
      const items = resolveItems(storeItems, buyNow);
      if (items.length === 0) throw new Error("Giỏ hàng trống");

      setIsOrdering(true);
      try {
        const response = await orderService.checkout({
          isGuest: true,
          guestEmail: values.guestEmail,
          guestAddress: values.guestAddress,
          paymentGateway: values.paymentGateway,
          items,
        });
        if (!response.data) throw new Error("Đặt hàng thất bại");
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

// ─── User checkout mutation ───────────────────────────────────────────────────

export const useCheckoutUserMutation = () => {
  const setIsOrdering = useOrderStore(selectorSetIsOrdering);
  const buyNow = useOrderStore((state) => state.buyNow);
  const storeItems = useOrderStore((state) => state.items);
  const queryOrder = useQueryOrder();

  return useMutation<CheckoutResponseData, Error, UserCheckoutInput>({
    mutationFn: async (values) => {
      const items = resolveItems(storeItems, buyNow);
      if (items.length === 0) throw new Error("Giỏ hàng trống");

      setIsOrdering(true);
      try {
        const response = await orderService.checkout({
          isGuest: false,
          addressId: values.addressId,
          paymentGateway: values.paymentGateway,
          items,
        });
        if (!response.data) throw new Error("Đặt hàng thất bại");
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

// ─── Deprecated aliases (remove after updating components) ───────────────────
/** @deprecated Use useCheckoutGuestMutation */
export const useCreateOrderGuestMutation = useCheckoutGuestMutation;
/** @deprecated Use useCheckoutUserMutation */
export const useCreateOrderUserMutation = useCheckoutUserMutation;

export * from "./use-query-order-items";
export * from "./use-query-orders";
