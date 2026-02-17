import { CartResponse } from "@/types/response/cart.response";
import { http } from "@/utils/http";


export const cartApi = {
    async getCart(): Promise<CartResponse> {
        return await http.get('cart');
    },
    async deleteCart() {
        return await http.del('cart');
    },
    async addCartItem(bookVariantId: bigint) {
        return await http.post('cart/items', {
            bookVariantId
        });
    },
    async updateQualityCartItem(quantity: number) {
        return await http.post('cart/items', {
            quantity
        });
    },
    async deleteCartItem(itemKey: number) {
        return await http.del(`cart/items/${itemKey}`)
    },
};
