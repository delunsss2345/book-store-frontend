import { cartApi } from "@/services/cart.service";
import { AddCartItemRequest } from "@/types/request/cart.request";
import { GroupedCartItem } from "@/types/response/cart.response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  selectorCart,
  selectorRemoveItem,
  selectorSetUpdateCart,
  selectorUpdateQty,
} from "../selector/cart.selector";
import { useCartStore } from "../store/cart.store";

const cartQueryKey = ["cart"] as const;

export const useCartQuery = () =>
  useQuery({
    queryKey: cartQueryKey,
    queryFn: cartApi.getCart,
    select: (response) => (response.success ? response.data : null),
    staleTime: 0,
  });

/** Flattens all grouped items into a single array */
export const useCartItemsFlat = (): GroupedCartItem[] => {
  const { data } = useCartQuery();
  if (!data) return [];
  return data.groups.flatMap((g) => g.items);
};

export const useUpdateQtyMutation = () => {
  const updateQty = useCartStore(selectorUpdateQty);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, delta }: { id: string; delta: number }) => {
      updateQty(id, delta);
      return cartApi.updateCartItemDelta({ itemKey: id, quantity: delta });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
    onError: (_err, { id, delta }) => {
      updateQty(id, -delta); // rollback
    },
  });
};

export const useRemoveItemMutation = () => {
  const removeItem = useCartStore(selectorRemoveItem);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      removeItem(id);
      return cartApi.deleteCartItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });
};

export const useAddToCartMutation = () => {
  const cart = useCartStore(selectorCart);
  const setUpdateCart = useCartStore(selectorSetUpdateCart);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookVariantId, quantity }: AddCartItemRequest) => {
      if (cart) {
        const item = cart.items.find(
          (item) => Number(item.bookVariantId) === Number(bookVariantId),
        );
        if (item) {
          setUpdateCart(item.id, quantity ?? 1); // optimistic tăng qty
        }
      }
      return cartApi.addCartItem({ bookVariantId, quantity: quantity ?? 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
    onError: (_err, { bookVariantId, quantity }) => {
      if (cart) {
        const item = cart.items.find(
          (item) => Number(item.bookVariantId) === Number(bookVariantId),
        );
        if (item) {
          setUpdateCart(item.id, (quantity ?? 1) * -1);
        }
      }
    },
  });
};

export const useQueryMergeCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.mergeCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });
};
