export type BookTranslation = {
    title: string;
    description: string | null;
    slug: string | null;
};

export type Book = {
    id: string;
    coverImageUrl: string | null;
    title?: string;
    description?: string | null;
    slug?: string | null;
    translations?: BookTranslation[];
};

export type VariantBase = {
    id: string;
    format: string;
    currencyCode: string | null;
    stock: number | null;
    book: Book;
};

export interface PricedVariant extends VariantBase {
    price: string;
}

export interface WishVariant extends PricedVariant { }

export type BaseCollection<TItem> = {
    userId: string | null;
    guestSessionId: string | null;
    items: TItem[];
};

export type BaseItem<TVariant, TItemId = string, TBookVariantId = string> = {
    id: TItemId;
    bookVariantId: TBookVariantId;
    variant: TVariant;
};

export interface CartLikeItem extends BaseItem<PricedVariant, string, string> {
    addedAt: string;
    quantity: number;
}

export interface WishLikeItem extends BaseItem<WishVariant, number, number> { }

export type Variant = PricedVariant;
export type VariantItem = PricedVariant;
