import { AdminBookDetail } from "@/types/request/admin.request";
import type { StateCreator } from "zustand";

type BooksSliceState = {
  books: any[];
  isLoadingBooks: boolean;
  bookDetail: AdminBookDetail | null;
  bookDraft: AdminBookDetail | null;
};

type BooksSliceActions = {
  setBooks: (books: any[]) => void;
  setBookDetail: (bookDetail: AdminBookDetail | null) => void;
  setBookDraft: (bookDraft: AdminBookDetail | null) => void;

  updateBookDetail: <K extends keyof AdminBookDetail>(
    field: K,
    value: AdminBookDetail[K],
  ) => void;

  updateBookDraft: <K extends keyof AdminBookDetail>(
    field: K,
    value: AdminBookDetail[K],
  ) => void;

  updateTranslationDraft: (
    languageId: number,
    field: string,
    value: string,
  ) => void;
};

export type BooksSlice = BooksSliceState & BooksSliceActions;

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
  books: [],
  isLoadingBooks: false,
  bookDetail: null,
  bookDraft: null,

  setBooks: (books) => set({ books }),
  setBookDetail: (bookDetail) => set({ bookDetail }),
  setBookDraft: (bookDraft) => set({ bookDraft }),
  updateBookDetail: (field, value) => {
    set((state) => {
      if (!state.bookDetail) return state;

      return {
        bookDetail: {
          ...state.bookDetail,
          [field]: value,
        },
      };
    });
  },

  updateBookDraft: (field, value) => {
    set((state) => {
      if (!state.bookDraft) return state;

      return {
        bookDraft: {
          ...state.bookDraft,
          [field]: value,
        },
      };
    });
  },

  updateTranslationDraft: (
    languageId: number,
    field: string,
    value: string,
  ) => {
    set((state) => {
      if (!state.bookDraft) return state;

      const translation = state.bookDraft.translation.find(
        (translation) => translation.languageId === languageId,
      );

      if (!translation) return state;

      return {
        bookDraft: {
          ...state.bookDraft,
          translation: state.bookDraft.translation.map((translation) =>
            translation.languageId === languageId
              ? { ...translation, [field]: value }
              : translation,
          ),
        },
      };
    });
  },
});
