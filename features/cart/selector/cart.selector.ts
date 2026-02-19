import { useCartStore } from "@/features/cart/store/cart.store";

type CartStoreState = ReturnType<typeof useCartStore.getState>;

export const selectorCart = (state: CartStoreState) => state.cart;
export const selectorIsLoadingCart = (state: CartStoreState) => state.isLoadingCart;
export const selectorSetCart = (state: CartStoreState) => state.setCart;
export const selectorAddToCart = (state: CartStoreState) => state.addToCart;
export const selectorRemoveItem = (state: CartStoreState) => state.removeItem;
export const selectorUpdateQty = (state: CartStoreState) => state.updateQty;
export const selectorClearCart = (state: CartStoreState) => state.clearCart;
export const selectorSetUpdateCart = (state: CartStoreState) => state.setUpdateCart;
