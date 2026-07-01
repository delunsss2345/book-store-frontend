import { ApiResponse, ProxyResponse } from "@/types/response/base.response";

// ─── Grouped Cart Types (new API shape) ──────────────────────────────────────

export type GroupedCartBook = {
    id: number;
    coverImageUrl: string | null;
    title: string;
    slug: string;
};

export type GroupedCartVariant = {
    id: number;
    price: string;
    format: string;
    currencyCode: string;
    stock: number;
};

export type GroupedCartItem = {
    id: number;
    bookVariantId: number;
    quantity: number;
    addedAt: string;
    variant: GroupedCartVariant;
    book: GroupedCartBook;
};

export type CartGroup = {
    date: string;
    items: GroupedCartItem[];
};

export type GroupedCart = {
    id: number;
    groups: CartGroup[];
};

// ─── Legacy flat Cart (kept for cart store compatibility) ─────────────────────

export type CartBookTranslation = {
    title: string;
    description: string | null;
    slug: string | null;
};

export type CartBook = {
    id: string;
    coverImageUrl: string | null;
    translations: CartBookTranslation;
};

export type CartVariant = {
    id: string;
    price: string;
    format: string;
    currencyCode: string | null;
    stock: number | null;
    book: CartBook;
};

export type CartItem = {
    id: string;
    bookVariantId: string;
    quantity: number;
    addedAt: string;
    variant: CartVariant;
};

export interface Cart {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string | null;
    guestSessionId: string | null;
    items: CartItem[];
}

// ─── Mutation response types ─────────────────────────────────────────────────

export type ClearCartData = {
    authError: boolean;
    success: boolean;
};

export type RemoveCartItemData = {
    authError: boolean;
    success: boolean;
};

export type AddCartItemData = {
    authError: boolean;
    item: {
        id: string;
        bookVariantId: number;
        quantity: number;
    };
};

export type UpdateCartItemDeltaData = {
    authError: boolean;
    cartItem: {
        itemKey: string;
        bookVariantId: number;
        quantity: number;
    };
};

export type MergeCartData = {
    mergeCount?: number;
    mergeCart: boolean;
};

export type GetCartApiResponse = ApiResponse<GroupedCart>;
export type ClearCartApiResponse = ApiResponse<ClearCartData>;
export type AddCartItemApiResponse = ApiResponse<AddCartItemData>;
export type RemoveCartItemApiResponse = ApiResponse<RemoveCartItemData>;
export type UpdateCartItemDeltaApiResponse = ApiResponse<UpdateCartItemDeltaData>;
export type MergeCartApiResponse = ApiResponse<MergeCartData>;

export type GetCartProxyResponse = ProxyResponse<GroupedCart>;
export type ClearCartProxyResponse = ProxyResponse<ClearCartData>;
export type AddCartItemProxyResponse = ProxyResponse<AddCartItemData>;
export type RemoveCartItemProxyResponse = ProxyResponse<RemoveCartItemData>;
export type UpdateCartItemDeltaProxyResponse = ProxyResponse<UpdateCartItemDeltaData>;
export type MergeCartProxyResponse = ProxyResponse<MergeCartData>;

export type CartResponse = GetCartApiResponse;
export type AddItemResponse = AddCartItemApiResponse;
