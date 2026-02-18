import { Wish, WishItem } from "@/types/response/wish.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishStore = {
    wish: Wish | null,
    isLoadingWish: boolean,
    setWish: (wish: Wish) => void
    addToWish: (item: WishItem) => void
}

export const useWishStore = create<WishStore>()(
    persist(
        (set) => ({
            wish: {
                userId: null,
                guestSessionId: null,
                items: []
            },
            isLoadingWish: false,
            setWish: (wish: Wish) => set({ wish }),
            addToWish: (item: WishItem) => set((state) => ({
                wish: {
                    ...state.wish!,
                    items: [...state.wish!.items, item]
                }
            })),
        }),
        {
            name: "wish-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ wish: state.wish }),
        },
    ),
);
