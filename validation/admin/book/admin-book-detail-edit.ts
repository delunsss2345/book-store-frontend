import { BookVariant } from "@/types/response/catalog.response";

export type AdminBookGeneralForm = {
  isActive: boolean;
  coverImageUrl: string;
  weightGrams: number;
  pageCount: number;
  publisherId: string;
  publicationYear: number;
};

export type AdminBookTranslationDraft = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

export type AdminBookVariantDraft = {
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

export type AdminBookEditStore = {
  general: AdminBookGeneralForm;
  translations: AdminBookTranslationDraft[];
  variants: AdminBookVariantDraft[];
};
