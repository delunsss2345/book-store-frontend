import { Cart } from "@/types/response/cart.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
    cart: Cart | null,
    isLoadingCart: boolean,
    setCart: (cart: Cart) => void
    addToCart: (bookVariantId: bigint) => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: {
                userId: null,
                guestSessionId: null,
                items: []
            },
            accessToken: null,
            isLoadingCart: false,
            setCart: (cart: Cart) => set({ cart }),
            addToCart: (bookVariantId: bigint) => set((state) => ({
                cart: {
                    ...(state?.cart ? state.cart : {
                        userId: null,
                        guestSessionId: null,
                        items: []
                    }),
                    items: [...state.cart!.items, { bookVariantId, quantity: 1 }]
                }
            })),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cart: state.cart }),
        },
    ),
);
