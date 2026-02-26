import { QuickBookFillResponse } from "@/types/response/search.response";
import { create } from "zustand";

type SearchStore = {
  isbnSearchResult: QuickBookFillResponse | null;
  setIsbnSearchResult: (result: QuickBookFillResponse | null) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  isbnSearchResult: null,
  setIsbnSearchResult: (result) => set({ isbnSearchResult: result }),
}));
