import { ApiResponse } from "@/types/response/base.response";

export type LanguageItemData = {
  id: string;
  code: string;
  name: string;
};

export type LanguageListResponse = ApiResponse<LanguageItemData[]>;
