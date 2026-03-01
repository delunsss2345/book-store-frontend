import { AddWishItemResponse, WishResponse } from "@/types/response/wish.response";
import { http } from "@/utils/http";


export const wishApi = {
    getWish(): Promise<WishResponse> {
        return http.get('wish');
    },
    deleteWish() {
        return http.del('wish');
    },
    addWishItem({ bookVariantId }: { bookVariantId: number }): Promise<AddWishItemResponse> {
        return http.post('wish/items', {
            bookVariantId
        });
    },
    async deleteWishItem(itemKey: number) {
        return http.del(`wish/items/${itemKey}`)
    },
};
