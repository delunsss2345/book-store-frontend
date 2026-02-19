import { Cart, CartItem } from "@/types/response/cart.response";
import { create } from "zustand";

type CartStore = {
    cart: Cart | null,
    isLoadingCart: boolean,
    setCart: (cart: Cart) => void
    addToCart: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQty: (id: string, delta: number) => void
    clearCart: () => void
    setUpdateCart: (id: string, delta: number) => void
}

export const useCartStore = create<CartStore>()((set) => ({
    cart: {
        id: "",
        createdAt: "",
        updatedAt: "",
        userId: null,
        guestSessionId: null,
        items: []
    },
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
    setUpdateCart: (id: string, delta: number) => set((state) => ({
        cart: {
            ...state.cart!,
            items: state.cart!.items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        }
    })),
    clearCart: () =>
        set((state) => ({
            cart: state.cart ? { ...state.cart, items: [] } : null,
        })),
}));
