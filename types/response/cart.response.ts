import { ApiResponse } from './base.response';

export type CartItem = {
    bookVariantId: bigint;
    quantity: number;
}

export type Cart<TItem = CartItem> = {
    userId: string | null;
    guestSessionId: string | null;
    items: TItem[];
};

export type CartResponse = ApiResponse<Cart>; 