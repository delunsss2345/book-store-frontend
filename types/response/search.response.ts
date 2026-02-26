import { ApiResponse } from "@/types/response/base.response";
import { CatalogBookCardDto } from "@/types/response/catalog.response";
import { CreateBookSpecRequest } from "../request/admin.request";

export type SearchBookItemData = CatalogBookCardDto & {
  score: number;
};

export type QuickBookSpecResponse = {
  widthCm?: number;
  heightCm?: number;
  thicknessCm?: number;
  packaging?: string;
};

export type QuickBookFillResponse = {
  title: string;
  description: string;
  authorName?: string;
  publisherName?: string;
  publicationYear?: number;
  pageCount?: number;
  weightGrams?: number;
  coverImageUrl?: string;
  spec?: CreateBookSpecRequest | undefined;
};

export type SearchBooksResponse = ApiResponse<SearchBookItemData[]>;
export type SearchBooksISBNQuickFillResponse =
  ApiResponse<QuickBookFillResponse>;
