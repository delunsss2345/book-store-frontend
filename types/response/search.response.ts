import {
  ApiResponse,
  PaginationResponse,
} from "@/types/response/base.response";
import {
  CatalogBookCardDto,
  CatalogCategoryDto,
} from "@/types/response/catalog.response";
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

export type SearchBooksISBNQuickFillResponse =
  ApiResponse<QuickBookFillResponse>;

export type SearchBookListItemDto = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  price: string;
  currencyCode: string;
  isOutOfStock: boolean;
  createdAt: string;
  bookVariantId: string;
  categories: CatalogCategoryDto[];
};

export type SearchBooksListResponse = ApiResponse<
  PaginationResponse<SearchBookListItemDto>
>;
