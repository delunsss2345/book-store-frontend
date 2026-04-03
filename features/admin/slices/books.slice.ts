import { AdminBook } from "@/types/response/admin.response";
import type { StateCreator } from "zustand";

type BooksSliceState = {
  books: any[];
  isLoadingBooks: boolean;
};

type BooksSliceActions = {
  setBooks: (books: any[]) => void;
  setIsLoadingBooks: (isLoading: boolean) => void;
};

export type BooksSlice = BooksSliceState & BooksSliceActions;

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
  books: [],
  isLoadingBooks: false,
  setBooks: (books) => set({ books }),
  setIsLoadingBooks: (isLoadingBooks) => set({ isLoadingBooks }),
});
