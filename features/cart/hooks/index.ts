import { useCartStore } from "@/features/cart/store/cart.store";
import { selectorSetCart } from "@/features/cart/selector/cart.selector";
import { cartApi } from "@/services/cart.service";
import { CartResponse } from "@/types/response/cart.response";
import { useMutation } from "@tanstack/react-query";

export const useCartMutation = () => {
    const setCart = useCartStore(selectorSetCart);
    return useMutation({
        mutationFn: cartApi.getCart,
        onSuccess: (res: CartResponse) => setCart(res.data)
    })
}

export const useAddToCartMutation = () => {
    const setCart = useCartStore(selectorSetCart);
    return useMutation({
        mutationFn: ({ bookVariantId }: { bookVariantId: bigint }) => cartApi.addCartItem({ bookVariantId }),
        onSuccess: (res: CartResponse) => setCart(res.data)
    })
}
