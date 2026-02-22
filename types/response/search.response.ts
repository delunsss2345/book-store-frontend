import { ApiResponse } from "@/types/response/base.response";
import { CatalogBookCardDto } from "@/types/response/catalog.response";

export type SearchBookItemData = CatalogBookCardDto & {
  score: number;
};

export type SearchBooksResponse = ApiResponse<SearchBookItemData[]>;
