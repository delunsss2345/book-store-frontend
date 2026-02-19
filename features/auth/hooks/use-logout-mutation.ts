import { selectorClearSession } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorClearCart } from "@/features/cart/selector/cart.selector";
import { useCartStore } from "@/features/cart/store/cart.store";
import { selectorClearWish } from "@/features/wish/selector/wish.selector";
import { useWishStore } from "@/features/wish/store/wish.store";
import { authApi } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogoutMutation = () => {
    const clearSession = useAuthStore(selectorClearSession);
    const clearCart = useCartStore(selectorClearCart);
    const clearWish = useWishStore(selectorClearWish);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            clearSession();
            clearCart();
            clearWish();
            queryClient.clear();
        },
        onError: () => {
            clearCart();
            clearSession();
            clearWish();
            queryClient.clear();
        }
    });
}
