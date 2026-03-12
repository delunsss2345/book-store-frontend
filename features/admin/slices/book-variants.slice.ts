import type { StateCreator } from "zustand";

type BooksVariantState = {
  bookVariants: any[];
};

type BooksVariantSliceAction = {
  setBookVariants: (bookVariants: any[]) => void;
};

export type BooksVariantSlice = BooksVariantState & BooksVariantSliceAction;

export const createBookVariantSlice: StateCreator<BooksVariantSlice> = (
  set,
) => ({
  bookVariants: [],
  setBookVariants: (bookVariants) => set({ bookVariants }),
});
