import { BookVariant } from "@/types/response/catalog.response";
import { Wish, WishItem } from "@/types/response/wish.response";
import { create } from "zustand";

type WishStore = {
    wish: Wish | null,
    isLoadingWish: boolean,
    setWish: (wish: Wish) => void
    addToWish: (item: WishItem) => void,
    wishVariantDetail: BookVariant | null,
    setWishVariantDetail: (item: BookVariant) => void,
    removeFromWish: (bookVariantId: number) => void
    clearWish: () => void
}

export const useWishStore = create<WishStore>()(
    (set) => ({
        wish: {
            userId: null,
            guestSessionId: null,
            items: []
        },
        wishVariantDetail: null,
        isLoadingWish: false,
        setWish: (wish: Wish) => set({ wish }),
        addToWish: (item: WishItem) => set((state) => ({
            wish: {
                ...state.wish!,
                items: [...state.wish!.items, item]
            }
        })),
        removeFromWish: (bookVariantId: number) => set((state) => ({
            wish: state.wish
                ? { ...state.wish, items: state.wish.items.filter((i) => i.bookVariantId !== bookVariantId) }
                : null,
        })),
        clearWish: () => set((state) => ({
            wish: state.wish ? { ...state.wish, items: [] } : null,
        })),

        setWishVariantDetail: (wishVariantDetail: BookVariant) => set({ wishVariantDetail })
    })
);
