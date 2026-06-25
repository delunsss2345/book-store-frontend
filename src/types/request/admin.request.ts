import { BookFormat, BookVariant } from "../response/catalog.response";

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
  publisherName: string;
  publicationYear?: number;
  pageCount?: number;
  weightGrams?: number;
  coverImageUrl?: string;
  badgeCode?: string | null;
  spec?: CreateBookSpecRequest | undefined;
  translations: CreateBookTranslationRequest[];
  authors?: CreateBookAuthorRequest[];
  variants: CreateBookVariantRequest[];
};

export type CreateAdminBookRequest = {
  isbn: string;
  title: string;
  description: string;
  publisherName: string;
  authors?: { authorName: string; isPrimary?: boolean }[];
  categories?: { categoryId: number }[];
  spec?: {
    widthCm?: number;
    heightCm?: number;
    thicknessCm?: number;
    packaging?: string;
  };
  publicationYear?: number;
  pageCount?: number;
  badgeCode?: string | null;
  coverImageUrl?: string;
};

export type UpdateAdminBookTranslationPayload = {
  languageId: number;
  title?: string;
  description?: string;
};

export type UpdateAdminBookVariantPayload = {
  id: number;
  costPrice: number;
  price?: number;
  isActive?: boolean;
};

export type UpdateAdminBookPayload = {
  pageCount?: number;
  weightGrams?: number;
  coverImageUrl?: string;
  isActive?: boolean;
  translations?: UpdateAdminBookTranslationPayload[];
  variants: UpdateAdminBookVariantPayload[];
};

export type AdminBookDetail = {
  id: string;
  publisherId: string;
  publicationYear: number;
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
  format: BookVariant;
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};
