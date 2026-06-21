import { ApiResponse } from "@/types/response/base.response";

export type ISODateString = string;
export type DecimalString = string;
export type CurrencyCode = string;

// --- Catalog Category ---

export type CatalogCategoryDto = {
  id: string;
  parentId?: string | null;
  name: string;
  slug?: string | null;
  sortOrder: number;
};

export type CatalogCategoryTreeDto = {
  id: string;
  parentId?: string | null;
  name: string;
  slug?: string | null;
  sortOrder: number;
  children: CatalogCategoryTreeDto[];
};

// --- Catalog Book Card ---

export type CatalogBookCardDto = {
  id: string;
  title: string;
  slug?: string | null;
  coverImageUrl?: string | null;
  price?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  currencyCode?: string | null;
  ratingAvg?: number | null;
  ratingCount?: number;
  soldCount?: number;
  isOutOfStock?: boolean;
  bookVariantId?: number;
  format?: string | null;
  badges?: string[];
  createdAt: string;
};

// --- Catalog Book Variant ---
export type CatalogBookVariantDto = {
  id: string;
  format: string;
  edition?: number | null;
  isbn?: string | null;
  price: string;
  currencyCode?: string | null;
  stock?: number | null;
  available?: number | null;
};

// --- Catalog Book Spec ---
export type CatalogBookSpecDto = {
  widthCm?: string | null;
  heightCm?: string | null;
  thicknessCm?: string | null;
  packaging?: string | null;
};

// --- Catalog Book Detail ---
export type CatalogBookDetailDto = {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  coverImageUrl?: string | null;
  publicationYear?: number | null;
  pageCount?: number | null;
  weightGrams?: number | null;
  publisherName?: string | null;
  ratingAvg?: number | null;
  ratingCount?: number;
  soldCount?: number;
  categories: CatalogCategoryDto[];
  variants: CatalogBookVariantDto[];
  specs: CatalogBookSpecDto;
  badges: string[];
  createdAt: string;

  recommend?: CatalogBookCardDto[];
};

// --- Catalog Book List ---

export type CatalogBookListData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: CatalogBookCardDto[];
};

// --- Catalog Home ---

export type CatalogHomeData = {
  newArrivals: CatalogBookCardDto[];
  bestSeller: CatalogBookCardDto[];
  topRated: CatalogBookCardDto[];
  recommend: CatalogBookCardDto[];
  generatedAt: string;
};

// --- Legacy aliases ---

export interface BookBase {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  ratingAvg: number | null;
  ratingCount: number;
  soldCount: number;
  createdAt: ISODateString;
}

export interface PricedBook extends BookBase {
  minPrice: DecimalString;
  maxPrice: DecimalString;
  currencyCode: CurrencyCode;
  description: string;
}

export interface HomeData {
  newAndTrending: PricedBook[];
}

export type BookFormat = "PAPERBACK" | "HARDCOVER" | (string & {});

export type BookVariant = CatalogBookVariantDto;
export type BookCategory = CatalogCategoryDto;
export type BookDetail = CatalogBookDetailDto;

export type CatalogHomeResponse = ApiResponse<CatalogHomeData>;
export type CatalogBookListResponse = ApiResponse<CatalogBookListData>;
export type CatalogBookDetailResponse = ApiResponse<CatalogBookDetailDto>;
export type CatalogCategoriesResponse = ApiResponse<CatalogCategoryTreeDto[]>;
export type GetBookDetailResponse = ApiResponse<BookDetail>;
export type HomeResponse = ApiResponse<HomeData>;
