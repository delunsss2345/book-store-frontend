import { ApiResponse } from './base.response';
import { VariantItem } from './variant.response';

export type CartItem = {
    id: string;
    bookVariantId: bigint;
    quantity: number;
    addedAt: Date;
    variant: VariantItem
}

export type Cart<TItem = CartItem> = {
    userId: string | null;
    guestSessionId: string | null;
    items: TItem[];
};

export type AddItemResponse = ApiResponse<{
    authError: boolean,
    item: CartItem;
}>;

export type CartResponse = ApiResponse<Cart>; 