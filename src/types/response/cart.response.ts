import { ApiResponse, ProxyResponse } from "@/types/response/base.response";
import {
    BaseCollection,
    CartLikeItem,
    PricedVariant,
    Book as VariantBook,
    BookTranslation as VariantBookTranslation,
} from "@/types/response/variant.response";

export type CartBookTranslation = VariantBookTranslation;

export type CartBook = VariantBook;

export type CartVariant = PricedVariant;

export interface CartItem extends CartLikeItem { }

export interface Cart extends BaseCollection<CartItem> {
    id: string;
    createdAt: string;
    updatedAt: string;
}

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

export type MergeCartData = unknown;

export type GetCartApiResponse = ApiResponse<Cart>;
export type ClearCartApiResponse = ApiResponse<ClearCartData>;
export type AddCartItemApiResponse = ApiResponse<AddCartItemData>;
export type RemoveCartItemApiResponse = ApiResponse<RemoveCartItemData>;
export type UpdateCartItemDeltaApiResponse = ApiResponse<UpdateCartItemDeltaData>;
export type MergeCartApiResponse = ApiResponse<MergeCartData>;

export type GetCartProxyResponse = ProxyResponse<Cart>;
export type ClearCartProxyResponse = ProxyResponse<ClearCartData>;
export type AddCartItemProxyResponse = ProxyResponse<AddCartItemData>;
export type RemoveCartItemProxyResponse = ProxyResponse<RemoveCartItemData>;
export type UpdateCartItemDeltaProxyResponse = ProxyResponse<UpdateCartItemDeltaData>;
export type MergeCartProxyResponse = ProxyResponse<MergeCartData>;

export type CartResponse = GetCartApiResponse;
export type AddItemResponse = AddCartItemApiResponse;
