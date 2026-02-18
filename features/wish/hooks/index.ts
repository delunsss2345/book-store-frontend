import { useMutation } from "@tanstack/react-query";
import { useWishStore } from "../store/wish.store";
import { wishApi } from "@/services/wish.service";
import { AddWishItemResponse, WishResponse } from "@/types/response/wish.response";


export const useWishlistMutation = () => {
    const setWishlist = useWishStore((state) => state.setWish);
    return useMutation({
        mutationFn: wishApi.getWish,
        onSuccess: (res: WishResponse) => setWishlist(res.data)
    })
}

export const useAddToWishlistMutation = () => {
    const addToWishlist = useWishStore((state) => state.addToWish);
    return useMutation({
        mutationFn: ({ bookVariantId }: { bookVariantId: bigint }) => wishApi.addWishItem({ bookVariantId }),
        onSuccess: (res: AddWishItemResponse) => addToWishlist(res.data.item)
    })
}
