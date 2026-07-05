"use client";
import { useWishlistQuery } from "@/features/wish/hooks";
import useTranslator from "@/hooks/use-translator";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistHeader() {
  const { t } = useTranslator();
  const { data: wish } = useWishlistQuery();
  return (
    <Link
      href={`/wishlist`}
      className="inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-ink transition hover:bg-paper"
      aria-label={t("header.aria.wishlist")}
    >
      <Heart className="h-[18px] w-[18px]" />
      <span className="text-[12px] font-semibold">
        {wish?.items?.length ?? 0}
      </span>
    </Link>
  );
}
