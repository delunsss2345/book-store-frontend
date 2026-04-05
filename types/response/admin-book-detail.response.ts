import { ApiResponse } from "./base.response";

export type AdminBookDetailData = {
  id: string;
  publisherId: string;
  publicationYear: number;
  authorName: string;
  publisherName: string;
  pageCount: number;
  weightGrams: number;
  coverImageUrl: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  translation: AdminBookTranslation[];
  variants: AdminBookVariant[];
};

export type AdminBookTranslation = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

export type AdminBookVariant = {
  id: string;
  format: string;
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};

export type AdminBookDetailResponse = ApiResponse<AdminBookDetailData>;
