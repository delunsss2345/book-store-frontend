import { AddWishItemResponse, WishResponse } from "@/types/response/wish.response";
import { http } from "@/utils/http";


export const wishApi = {
    async getWish(): Promise<WishResponse> {
        return await http.get('wish');
    },
    async deleteWish() {
        return await http.del('wish');
    },
    async addWishItem({ bookVariantId }: { bookVariantId: bigint }): Promise<AddWishItemResponse> {
        return await http.post('wish/items', {
            bookVariantId
        });
    },
    async deleteWishItem(itemKey: number) {
        return await http.del(`wish/items/${itemKey}`)
    },
};
