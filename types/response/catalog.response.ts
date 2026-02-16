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

export interface NewArrivalBook extends BookBase {
}

export interface PricedBook extends BookBase {
    minPrice: DecimalString;
    maxPrice: DecimalString;
    currencyCode: CurrencyCode;
}

export interface HomeData {
    newArrivals: NewArrivalBook[];
    bestSeller: PricedBook[];
    topRated: PricedBook[];
}

export type HomeResponse = ApiResponse<HomeData>;
