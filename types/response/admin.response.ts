import {
  ApiResponse,
  PaginationResponse,
} from "@/types/response/base.response";

// --- Admin Book Translation ---

export type AdminBookTranslation = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

// --- Admin Book Variant ---

export type AdminBookVariant = {
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

// --- Admin Book ---

export type AdminBook = {
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
  translation: AdminBookTranslation;
  variants: AdminBookVariant[];
};

// --- Admin Book List (Paginated) ---

export type AdminBookListData = PaginationResponse<AdminBook>;

// --- API Response Types ---

export type AdminBookListResponse = ApiResponse<AdminBookListData>;
export type AdminBookResponse = ApiResponse<AdminBook>;
