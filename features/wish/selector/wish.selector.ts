import { useWishStore } from "@/features/wish/store/wish.store";

type WishStoreState = ReturnType<typeof useWishStore.getState>;

export const selectorWish = (state: WishStoreState) => state.wish;
export const selectorIsLoadingWish = (state: WishStoreState) => state.isLoadingWish;
export const selectorSetWish = (state: WishStoreState) => state.setWish;
export const selectorAddToWish = (state: WishStoreState) => state.addToWish;
export const selectorRemoveFromWish = (state: WishStoreState) => state.removeFromWish;
export const selectorClearWish = (state: WishStoreState) => state.clearWish;
