import { ApiResponse } from './base.response';
export type Cart<TItem = unknown> = {
    id: string;
    userId: string | null;
    guestSessionId: string | null;
    createdAt: string;
    updatedAt: string;
    items: TItem[];
};


export type CartResponse = ApiResponse<Cart>; 