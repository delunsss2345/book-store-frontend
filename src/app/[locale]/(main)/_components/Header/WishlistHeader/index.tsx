'use client'
import { useWishlistQuery } from "@/features/wish/hooks";
import useTranslator from "@/hooks/use-translator";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistHeader() {
    const { t } = useTranslator();
    const { data: wish } = useWishlistQuery();
    return <Link
        href="/wishlist"
        className="inline-flex gap-2 h-9 w-9 items-center justify-center rounded-sm hover:bg-muted"
        aria-label={t("header.aria.wishlist")}
    >
        <span>
            {wish?.items?.length ?? 0}
        </span>
        <Heart className="h-5 w-5" />
    </Link>

}