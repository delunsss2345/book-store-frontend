import {  Cart, CartItem } from "@/types/response/cart.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
    cart: Cart | null,
    isLoadingCart: boolean,
    setCart: (cart: Cart) => void
    addToCart: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQty: (id: string, delta: number) => void
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
            addToCart: (item: CartItem) => set((state) => ({
                cart: {
                    ...state.cart!,
                    items: [...state.cart!.items, item]
                }
            })),
            removeItem: (id: string) => set((state) => ({
                cart: {
                    ...state.cart!,
                    items: state.cart!.items.filter((item) => item.id !== id)
                }
            })),
            updateQty: (id: string, delta: number) => set((state) => ({
                cart: {
                    ...state.cart!,
                    items: state.cart!.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
                    )
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
