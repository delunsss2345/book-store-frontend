import { selectorClearSession } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorClearCart } from "@/features/cart/selector/cart.selector";
import { useCartStore } from "@/features/cart/store/cart.store";
import { selectorClearWish } from "@/features/wish/selector/wish.selector";
import { useWishStore } from "@/features/wish/store/wish.store";
import { authApi } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ME_QUERY_KEY } from "@/features/auth/hooks/use-query-me";

export const useLogoutMutation = () => {
  const clearSession = useAuthStore(selectorClearSession);
  const clearCart = useCartStore(selectorClearCart);
  const clearWish = useWishStore(selectorClearWish);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onMutate: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
      clearSession();
      clearCart();
      clearWish();
    },
    onSuccess: () => {
      queryClient.clear();
    },
    onError: () => {
      queryClient.clear();
    },
  });
};
