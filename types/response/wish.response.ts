import { ApiResponse } from './base.response';
import { VariantItem } from './variant.response';

export type WishItem = {
    id: bigint
    bookVariantId: bigint,
    addedAt: Date,
    variant: VariantItem
}

export type Wish<TItem = WishItem> = {
    userId: string | null;
    guestSessionId: string | null;
    items: TItem[];
};

export type AddWishItemResponse = ApiResponse<{
    item: WishItem;
}>;

export type WishResponse = ApiResponse<Wish>;
