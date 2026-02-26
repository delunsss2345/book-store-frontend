import { BookFormat } from "../response/catalog.response";
import { Badge } from "@/components/ui/badge";

export type CreateBookSpecRequest = {
  widthCm?: number;
  heightCm?: number;
  thicknessCm?: number;
  packaging?: string;
};
export type CreateBookTranslationRequest = {
  languageId: number;

  languageCode?: string;

  title: string;
  description?: string;
  slug?: string;
};
export type CreateBookAuthorRequest = {
  authorName: string;
  isPrimary?: boolean;
};
export type CreateBookVariantRequest = {
  format: BookFormat;

  edition?: number;
  isbn?: string;

  costPrice: number;
  price: number;

  currencyCode?: string;
  stock?: number;
  isActive?: boolean;
};

export type CreateAdminBookAllRequest = {
  // Publisher
  publisherName: string;
  // Book-level fields
  publicationYear?: number;
  pageCount?: number;
  weightGrams?: number;
  coverImageUrl?: string;
  // Badge
  badgeCode?: string | null;
  // Specs
  spec?: CreateBookSpecRequest | undefined;
  translations: CreateBookTranslationRequest[];
  // Authors
  authors?: CreateBookAuthorRequest[];
  // Variants (>=1)
  variants: CreateBookVariantRequest[];
};
