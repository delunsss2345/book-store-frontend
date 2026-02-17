import { useCartStore } from "@/features/cart/store/cart.store";

type CartStoreState = ReturnType<typeof useCartStore.getState>;

export const selectorCart = (state: CartStoreState) => state.cart;
export const selectorIsLoadingCart = (state: CartStoreState) => state.isLoadingCart;
export const selectorSetCart = (state: CartStoreState) => state.setCart;
