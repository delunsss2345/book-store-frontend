import { ApiResponse } from './base.response';
import { BaseCollection, WishVariant as BaseWishVariant, WishLikeItem } from './variant.response';

export type WishVariant = BaseWishVariant;

export interface WishItem extends WishLikeItem { }

export interface Wish<TItem = WishItem> extends BaseCollection<TItem> { }

export type AddWishItemResponse = ApiResponse<{
    item: WishItem;
}>;

export type WishResponse = ApiResponse<Wish>;
