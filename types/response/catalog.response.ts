import { ApiResponse } from "@/types/response/base.response";

export type ISODateString = string;      // e.g. "2026-02-13T02:20:11.521Z"
export type DecimalString = string;      // e.g. "230000.00"
export type CurrencyCode = string;       // e.g. "VND"

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
}

export interface HomeData {
    newAndTrending: PricedBook[]
}

export type BookFormat = "PAPERBACK" | "HARDCOVER" | (string & {});

export type BookVariant = {
    id: string;
    format: BookFormat;
    edition: number;
    isbn: string;
    price: string;
    currencyCode: CurrencyCode;
    stock: number;
};

export type BookCategory = {
    id: string;
    parentId: string | null;
    sortOrder: number;
    name: string;
    slug: string;
};

export type BookDetail = {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImageUrl: string;

    publicationYear: number;
    pageCount: number;
    weightGrams: number;
    publisherName: string;

    ratingAvg: number | null;
    ratingCount: number;

    variants: BookVariant[];
    categories: BookCategory[];

    specs: Record<string, unknown>;
    badges: unknown[];

    createdAt: string;
};

export type GetBookDetailResponse = ApiResponse<BookDetail>;
export type HomeResponse = ApiResponse<HomeData>;
