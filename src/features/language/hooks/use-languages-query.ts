import { languageService } from "@/services/language.service";
import { LanguageItemData } from "@/types/response/language.response";
import { useQuery } from "@tanstack/react-query";

const fetchLanguages = async (): Promise<LanguageItemData[]> => {
  const payload = await languageService.getLanguages();

  if (!payload.success) {
    const message = payload.message ?? "Unable to load languages";
    throw new Error(message);
  }

  return payload.data;
};

export const useLanguagesQuery = () =>
  useQuery<LanguageItemData[]>({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    staleTime: 60_000,
    placeholderData: (previousData) => previousData
  });
