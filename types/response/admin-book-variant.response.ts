import {
  ApiResponse,
  PaginationResponse,
} from "@/types/response/base.response";

// --- Admin Book Variant (from /admin/book-variants) ---

export type AdminBookVariantTranslation = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

export type AdminBookVariantDetail = {
  id: string;
  format: "PAPERBACK" | "HARDCOVER" | "EBOOK" | "AUDIOBOOK" | (string & {});
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};

export type AdminBookVariantItem = {
  id: string;
  publisherId: string;
  publicationYear: number;
  pageCount: number;
  weightGrams: number;
  coverImageUrl: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  translations: AdminBookVariantTranslation[];
  variants: AdminBookVariantDetail[];
};

// --- Paginated & API Response ---

export type AdminBookVariantListData =
  PaginationResponse<AdminBookVariantItem>;

export type AdminBookVariantListResponse =
  ApiResponse<AdminBookVariantListData>;
