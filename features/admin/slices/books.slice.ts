import { AdminBook } from "@/types/response/admin.response";
import type { StateCreator } from "zustand";

type BooksSliceState = {
  books: any[];
  isLoadingBooks: boolean;
  bookEdit: AdminBook | null;
};

type BooksSliceActions = {
  setBooks: (books: any[]) => void;
  setIsLoadingBooks: (isLoading: boolean) => void;
  setBookEdit: (bookEdit: AdminBook | null) => void;
};

export type BooksSlice = BooksSliceState & BooksSliceActions;

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
  books: [],
  isLoadingBooks: false,
  bookEdit: null,
  setBooks: (books) => set({ books }),
  setIsLoadingBooks: (isLoadingBooks) => set({ isLoadingBooks }),
  setBookEdit: (bookEdit) => set({ bookEdit }),
});
