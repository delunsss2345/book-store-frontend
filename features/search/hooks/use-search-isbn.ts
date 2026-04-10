import { searchApi } from "@/services/search.service";
import { useMutation } from "@tanstack/react-query";
import { useSearchStore } from "../store/search.store";

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
