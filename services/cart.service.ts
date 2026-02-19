import {
    AddCartItemRequest,
    MergeCartRequest,
    UpdateCartItemDeltaRequest,
} from "@/types/request/cart.request";
import {
    AddCartItemProxyResponse,
    ClearCartProxyResponse,
    GetCartProxyResponse,
    MergeCartProxyResponse,
    RemoveCartItemProxyResponse,
    UpdateCartItemDeltaProxyResponse,
} from "@/types/response/cart.response";
import { http } from "@/utils/http";


export const cartApi = {
    async getCart(): Promise<GetCartProxyResponse> {
        return await http.get('cart');
    },
    async deleteCart(): Promise<ClearCartProxyResponse> {
        return await http.del('cart');
    },
    async addCartItem(payload: AddCartItemRequest): Promise<AddCartItemProxyResponse> {
        return await http.post('cart/items', payload);
    },
    async updateCartItemDelta({
        itemKey,
        quantity,
    }: { itemKey: string } & UpdateCartItemDeltaRequest): Promise<UpdateCartItemDeltaProxyResponse> {
        return await http.patch(`cart/items/${itemKey}/delta`, {
            quantity,
        });
    },
    async deleteCartItem(itemKey: string): Promise<RemoveCartItemProxyResponse> {
        return await http.del(`cart/items/${itemKey}`);
    },
    async mergeCart(payload: MergeCartRequest = {}): Promise<MergeCartProxyResponse> {
        const requestBody =
            typeof payload === "object" && payload !== null ? payload : {};

        return await http.post("cart/merge", requestBody);
    },
};
