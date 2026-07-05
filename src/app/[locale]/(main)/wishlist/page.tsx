"use client";

import { useWishlistQuery } from "@/features/wish/hooks";
import { CardSkeleton } from "@/src/components/common/Skeletons";
import { Skeleton } from "@/src/components/ui/skeleton";
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
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} className="border-none shadow-none p-0" />
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
    <div className="bg-paper min-h-screen">
      <div className="px-6 py-10 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="display text-[30px] font-semibold tracking-tight text-ink">
            {t("wishlist.page.title")}
          </h1>
          <button className="btn-soft h-10 rounded-sm px-4 text-[13px] text-ink">
            {t("wishlist.page.addAllToCart")}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {wishlist &&
            wishlist?.items.map((item: WishItem) => {
              const book = item.variant.book;
              const translation = book.translations?.[0];
              const title = translation?.title || book.title || "";
              const description = translation?.description || book.description || "";
              const slug = translation?.slug || book.slug || book.id;

              return (
                <BookCard
                  key={item.id}
                  title={title}
                  description={description}
                  price={item.variant.price ? Number(item.variant.price) : undefined}
                  currency={item.variant.currencyCode ?? undefined}
                  bookVariantId={Number(item.variant.id)}
                  imageUrl={book?.coverImageUrl ?? undefined}
                  href={`/detail/${slug}`}
                />
              );
            })}
          {wishlist?.items.length === 0 && (
            <p className="mt-4 text-[14px] text-ink-3 col-span-full">
              {t("wishlist.page.empty")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
