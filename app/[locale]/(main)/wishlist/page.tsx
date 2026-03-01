"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlistQuery } from "@/features/wish/hooks";
import { WishItem } from "@/types/response/wish.response";
import { useTranslations } from "next-intl";
import BookCard from "../_components/BookCard";

const WishlistPage = () => {
  const t = useTranslations();
  const { data: wishlist, isPending, isError } = useWishlistQuery();

  if (isPending) {
    return (
      <div className="container-main w-full py-8 min-h-[50vh] space-y-6">
        <Skeleton className="h-10 w-56" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-md border p-3">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-main w-full py-8 min-h-[50vh] text-sm text-zinc-500">
        {t("wishlist.page.loadError")}
      </div>
    );
  }

  return (
    <div className="container-main w-full py-8 min-h-[50vh]">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{t("wishlist.page.title")}</h1>
        <Button variant="outline" className="h-10 rounded-sm px-4 text-base">
          {t("wishlist.page.addAllToCart")}
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist &&
          wishlist?.items.map((item: WishItem) => (
            <BookCard
              key={item.id}
              title={item.variant.book.translations[0].title}
              subtitle={item.variant.book.translations[0].description ?? ""}
              price={0}
              bookVariantId={Number(item.variant.id)}
              imageUrl={item.variant.book?.coverImageUrl ?? ""}
              href={`/detail/${item.variant.book.id}`}
            />
          ))}
        {wishlist?.items.length === 0 && (
          <p className="mt-4 text-base">{t("wishlist.page.empty")}</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
