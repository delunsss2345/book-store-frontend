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
    getCart(): Promise<GetCartProxyResponse> {
        return http.get('cart');
    },
    deleteCart(): Promise<ClearCartProxyResponse> {
        return http.del('cart');
    },
    addCartItem(payload: AddCartItemRequest): Promise<AddCartItemProxyResponse> {
        return http.post('cart/items', payload);
    },
    updateCartItemDelta({
        itemKey,
        quantity,
    }: { itemKey: string } & UpdateCartItemDeltaRequest): Promise<UpdateCartItemDeltaProxyResponse> {
        return http.patch(`cart/items/${itemKey}/delta`, {
            quantity,
        });
    },
    deleteCartItem(itemKey: string): Promise<RemoveCartItemProxyResponse> {
        return http.del(`cart/items/${itemKey}`);
    },
    async mergeCart(payload: MergeCartRequest = {}): Promise<MergeCartProxyResponse> {
        const requestBody =
            typeof payload === "object" && payload !== null ? payload : {};

        return http.post("cart/merge", requestBody);
    },
};
