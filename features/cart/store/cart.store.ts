import { Cart } from "@/types/response/cart.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
    cart: Cart | null,
    isLoadingCart: boolean,
    setCart: (cart: Cart) => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: null,
            accessToken: null,
            isLoadingCart: false,
            setCart: (cart) => set({ cart }),

        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cart: state.cart }),
        },
    ),
);
