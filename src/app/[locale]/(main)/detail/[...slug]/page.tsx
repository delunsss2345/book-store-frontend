"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import RecommendedSection from "@/src/app/[locale]/(main)/_components/RecommendSection";
import { LoadingLazy } from "@/src/components/common/LoadingLazy";
import { Button } from "@/src/components/ui/button";
import { useAddToCartMutation } from "@/features/cart/hooks";
import { useBookQuery } from "@/features/catalog/hooks/use-book.mutation";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useWishStore } from "@/features/wish/store/wish.store";
import { FormatAvailability } from "./_components/FormatAvailability";
import { FormatPicker } from "./_components/FormatPicker";
import { FormatPrice } from "./_components/FormatPrice";
import { ProductDescriptionPanel } from "./_components/ProductDescriptionPanel";
import { ProductGallery } from "./_components/ProductGallery";
import { WishlistAction } from "./_components/WishlistAction";

export default function DetailPage() {
  const t = useTranslations();
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug)
    ? params.slug[params.slug.length - 1]
    : (params.slug ?? "");

  const { data: bookDetail, isPending, isError } = useBookQuery(slug);

  const setVariantDetail = useCatalogStore((state) => state.setVariantDetail);
  const bookVariantDetail = useCatalogStore((state) => state.bookVariantDetail);

  const setWishVariantDetail = useWishStore(
    (state) => state.setWishVariantDetail,
  );

  const { mutateAsync: addToCart, isPending: isAdding } =
    useAddToCartMutation();

  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    if (bookDetail?.variants?.length) {
      setVariantDetail(bookDetail.variants[0]);
      setWishVariantDetail(bookDetail.variants[0]);
    }
  }, [bookDetail, setVariantDetail, setWishVariantDetail]);

  if (isPending) return <LoadingLazy />;
  if (isError || !bookDetail) {
    return (
      <div className="container-main py-20 text-center text-zinc-500">
        {t("detail.bookNotFound")}
      </div>
    );
  }

  const handleAddToCart = async (quantity: number) => {
    if (bookVariantDetail && quantity >= 1) {
      toast.promise(
        addToCart({
          bookVariantId: Number(bookVariantDetail.id),
          quantity,
        }),
        {
          loading: t("detail.toast.addToCartLoading"),
          success: t("detail.toast.addToCartSuccess"),
          error: t("detail.toast.addToCartError"),
        },
      );
    }
  };

  return (
    <div className="bg-surface">
      <div className="px-6 py-6 lg:px-10">
        <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-ink-3">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {t("catalog.breadcrumbs.home")}
          </Link>
          <span className="text-line-2">/</span>
          <Link href={`/${locale}/books`} className="hover:text-ink transition-colors">
            {t("catalog.breadcrumbs.books")}
          </Link>
          <span className="text-line-2">/</span>
          <span className="text-ink truncate">{bookDetail.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ProductGallery
              coverImageUrl={bookDetail.coverImageUrl}
              title={bookDetail.title}
            />
          </div>
          
          <section className="flex flex-col lg:col-span-7 lg:pl-6">
            <div className="border-b border-line pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-[0.2em] text-accent uppercase">
                  {bookDetail.categories?.[0]?.name || "Fine Art"}
                </span>
                <span className="text-[12px] text-ink-3 italic">
                  SKU: {bookDetail.id.slice(0, 8)}
                </span>
              </div>

              <h1 className="display mt-3 text-[32px] font-semibold leading-tight tracking-tight md:text-[40px] text-ink">
                {bookDetail.title}
              </h1>

              <div className="mt-6 flex items-baseline justify-between">
                <div className="origin-left">
                  <FormatPrice />
                </div>
                <WishlistAction />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <FormatPicker
                  variants={bookDetail.variants}
                  onChange={setVariantDetail}
                />
                <FormatAvailability />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-full items-center justify-between rounded-lg border border-line px-2 sm:w-32">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-paper"
                    onClick={() => setQty((p) => Math.max(1, p - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-[14px] font-medium">{qty}</span>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-paper"
                    onClick={() => setQty((p) => p + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(qty)}
                  disabled={isAdding}
                  className="btn-ink h-12 flex-1 rounded-lg text-[13px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </button>
                
                <Link
                  href={`/${locale}/checkout`}
                  className="btn-accent flex h-12 flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold uppercase tracking-[0.15em]"
                >
                  Buy now
                </Link>
              </div>

              <div className="space-y-4 rounded-xl bg-paper p-5">
                <p className="line-clamp-4 text-[14px] leading-7 text-ink-2">
                  {bookDetail.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-line pt-6 text-[12px] uppercase tracking-wider text-ink-3">
                  <div>
                    <p className="font-bold text-ink">Pages</p>
                    <p className="mt-1">{bookDetail.pageCount || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-bold text-ink">Weight</p>
                    <p className="mt-1">
                      {bookDetail.weightGrams
                        ? `${(bookDetail.weightGrams / 1000).toFixed(2)} kg`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote block */}
              <div className="border-l-2 border-ink pl-6 py-1">
                <p className="display text-[18px] italic leading-relaxed text-ink-2">
                  &ldquo;Strategy without tactics is the slowest route to victory.
                  Tactics without strategy is the noise before defeat.&rdquo;
                </p>
                <cite className="mt-3 block text-[12px] font-bold uppercase tracking-widest text-ink-3 not-italic">
                  — Sun Tzu, The Art of War
                </cite>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ProductDescriptionPanel bookDetail={bookDetail} />

      {/* RECOMMENDED PRODUCTS */}
      <section className="bg-paper px-6 py-12 lg:px-10 border-t border-line">
        <div className="mx-auto max-w-5xl">
          <RecommendedSection
            books={bookDetail?.recommend ?? []}
            title={t("detail.recommendedTitle")}
          />
        </div>
      </section>
    </div>
  );
}
