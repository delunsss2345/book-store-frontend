import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useWishlistQuery } from "@/features/wish/hooks";
import { useWishStore } from "@/features/wish/store/wish.store";
import { Heart } from "lucide-react";
import { useMemo } from "react";

export function WishlistAction() {
    const wishVariantDetail = useWishStore(state => state.wishVariantDetail)

    const { data: wish } = useWishlistQuery();
    const isWish = useMemo(() => {
        if (!wishVariantDetail?.id) return false
        const id = Number(wishVariantDetail.id)
        return !!wish?.items?.some(i => {
            return Number(i.bookVariantId) === Number(id)
        })
    }, [wishVariantDetail?.id, wish?.items])

    const { mutateAsync: addWishItemMutation } = useAddToWishlistMutation();
    const { mutateAsync: removeWishItemMutation } = useRemoveFromWishlistMutation();


    const handleWish = async () => {
        if (wishVariantDetail && !isWish) {
            await addWishItemMutation({
                bookVariantId: Number(wishVariantDetail.id),
            })
        } 
        else {
            if (!wishVariantDetail?.id) return
            const itemKey = wish?.items?.find(i => {
                if(Number(i.bookVariantId) === Number(wishVariantDetail.id)) return i.id
            })

            if (!itemKey) return
            await removeWishItemMutation({
                itemKey : Number(itemKey.id),
                bookVariantId: Number(wishVariantDetail.id),
            })
        }
    }
    return <>
        <button
            onClick={handleWish}
            type="button"
            className={`group cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border ${isWish ? 'border-red-200 bg-red-50' : ""} border-neutral-200 transition-all hover:bg-red-50 hover:border-red-200`}
            aria-label="Add to wishlist"
        >
            <Heart className={`h-5 w-5 transition-colors group-hover:fill-red-500 group-hover:text-red-500 ${isWish ? 'text-red-500 fill-red-500' : ""}`} />
        </button></>
}