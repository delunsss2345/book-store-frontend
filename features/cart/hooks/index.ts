import { useCartStore } from "@/features/cart/store/cart.store";
import { selectorAddToCart, selectorSetCart } from "@/features/cart/selector/cart.selector";
import { cartApi } from "@/services/cart.service";
import { AddItemResponse, CartResponse } from "@/types/response/cart.response";
import { useMutation } from "@tanstack/react-query";

export const useCartMutation = () => {
    const setCart = useCartStore(selectorSetCart);
    return useMutation({
        mutationFn: cartApi.getCart,
        onSuccess: (res: CartResponse) => setCart(res.data)
    })
}

export const useAddToCartMutation = () => {
    const addToCart = useCartStore(selectorAddToCart);
    return useMutation({
        mutationFn: ({ bookVariantId }: { bookVariantId: bigint }) => cartApi.addCartItem({ bookVariantId }),
        onSuccess: (res: AddItemResponse) => addToCart(res.data.item)
    })
}

export const useUpdateQtyMutation = () => {
    const updateQty = useCartStore(state => state.updateQty);
    return useMutation({
        mutationFn: ({ id, delta }: { id: string; delta: number }) => cartApi.updateQualityCartItem(id, delta),
        onSuccess: (res:  any) => updateQty(res.data.item)
    })
}

export const useRemoveItemMutation = () => {
    const removeItem = useCartStore(state => state.removeItem);
    return useMutation({
        mutationFn: (id: string) => cartApi.deleteCartItem(id),
        onSuccess: (res:  any) => removeItem(res.data.item)
    })
}