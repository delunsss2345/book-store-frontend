import { SearchBooksISBNQuickFillResponse } from "@/types/response/search.response";
import { useMutation } from "@tanstack/react-query";
import { useSearchStore } from "../store/search.store";
import { searchApi } from "@/services/search.service";

export const useSearchIsbnMutation = () => {
  const setIsbnSearchResult = useSearchStore(
    (state) => state.setIsbnSearchResult,
  );
  return useMutation({
    mutationFn: async ({ isbn, lang }: { isbn: string; lang: string }) => {
      const response = await searchApi.searchByIsbn(isbn, lang);
      setIsbnSearchResult(response.data);
      return response.data;
    },
  });
};
