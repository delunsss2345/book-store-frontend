export type AddCartItemRequest = {
    bookVariantId: number;
    quantity?: number;
};

export type UpdateCartItemDeltaRequest = {
    quantity: number;
};

export type MergeCartRequest = unknown;

export type CartItemKeyParam = {
    itemKey: string;
};
