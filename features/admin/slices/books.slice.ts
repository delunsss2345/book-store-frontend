import { AdminBookDetail } from "@/types/request/admin.request";
import type { StateCreator } from "zustand";

type BooksSliceState = {
  books: any[];
  isLoadingBooks: boolean;
  bookDetail: AdminBookDetail | null;
};

type BooksSliceActions = {
  setBooks: (books: any[]) => void;
  setIsLoadingBooks: (isLoading: boolean) => void;
  setBookDetail: (bookDetail: AdminBookDetail) => void;
};

export type BooksSlice = BooksSliceState & BooksSliceActions;

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
  books: [],
  bookDetail: null,
  isLoadingBooks: false,
  setBooks: (books) => set({ books }),
  setIsLoadingBooks: (isLoadingBooks) => set({ isLoadingBooks }),
  setBookDetail: (bookDetail) => set({ bookDetail }),
});
