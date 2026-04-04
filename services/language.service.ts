import type { LanguageListResponse } from "@/types/response/language.response";
import { http } from "@/utils/http";

export const languageService = {
  getLanguages: () => http.get<LanguageListResponse>("/languages"),
};
