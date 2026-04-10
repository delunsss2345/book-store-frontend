import { BookVariant } from "@/types/response/catalog.response";
import type { StateCreator } from "zustand";

type BooksVariantState = {
  bookVariants: BookVariant[];
};

type BooksVariantSliceAction = {
  setBookVariants: (bookVariants: BookVariant[]) => void;
};

export type BooksVariantSlice = BooksVariantState & BooksVariantSliceAction;
export const createBookVariantSlice: StateCreator<BooksVariantSlice> = (
  set,
) => ({
  bookVariants: [],
  setBookVariants: (bookVariants) => set({ bookVariants }),
});
