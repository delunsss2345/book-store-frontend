"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import RecommendedSection from "@/app/[locale]/(main)/_components/RecommendSection";
import { LoadingLazy } from "@/components/common/LoadingLazy";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAddToCartMutation } from "@/features/cart/hooks";
import { useBookQuery } from "@/features/catalog/hooks/use-book.mutation";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useWishStore } from "@/features/wish/store/wish.store";
import { cn } from "@/lib/utils";
import { FormatAvailability } from "./_components/FormatAvailability";
import { FormatPicker } from "./_components/FormatPicker";
import { FormatPrice } from "./_components/FormatPrice";
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
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);
  const [reviewsOpen, setReviewsOpen] = React.useState(false);

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
    <main className="w-full bg-white text-neutral-900">
      <div className="container-main py-4">
        <nav className="flex items-center gap-2 overflow-hidden text-[11px] font-medium uppercase tracking-widest text-neutral-500 md:text-[12px]">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href="/catalog" className="hover:text-black transition-colors">
            Books
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="truncate text-neutral-900">{bookDetail.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <section className="lg:col-span-5">
            {" "}
            <div className=" flex flex-col-reverse gap-4 md:flex-row">
              <div className="flex flex-row gap-3 overflow-x-auto pb-2 md:w-20 md:flex-col md:overflow-y-visible md:pb-0">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="relative aspect-[3/4] w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 transition-all hover:border-black md:w-full"
                  >
                    <Image
                      src={bookDetail?.coverImageUrl}
                      alt="thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Ảnh chính - Thêm max-h để không quá cao trên màn hình lớn */}
              <div className="relative flex-1">
                <div className="relative aspect-[3/4] w-full max-w-[450px] mx-auto overflow-hidden rounded-xl bg-[#fdfdfd] shadow-2xl shadow-neutral-200/50">
                  {bookDetail?.coverImageUrl ? (
                    <div className="relative h-full w-full p-4 md:p-10">
                      <Image
                        src={bookDetail?.coverImageUrl}
                        alt={bookDetail.title}
                        fill
                        priority
                        className="object-contain drop-shadow-[2px_10px_20px_rgba(0,0,0,0.15)]"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full bg-neutral-100 animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col lg:col-span-7 lg:pl-10">
            <div className="border-b border-neutral-100 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-[0.2em] text-red-600 uppercase">
                  {bookDetail.categories?.[0]?.name}
                </span>
                <span className="text-[12px] text-neutral-400 italic">
                  SKU: {bookDetail.id.slice(0, 8)}
                </span>
              </div>

              <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                {bookDetail.title}
              </h1>

              <div className="mt-6 flex items-baseline justify-between">
                <div className="scale-110 origin-left">
                  <FormatPrice />
                </div>
                <WishlistAction />
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div className="space-y-4">
                <FormatPicker
                  variants={bookDetail.variants}
                  onChange={setVariantDetail}
                />
                <FormatAvailability />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-full items-center justify-between rounded-md border border-neutral-200 px-2 sm:w-32">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-sm hover:bg-neutral-100"
                    onClick={() => setQty((p) => Math.max(1, p - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-sm hover:bg-neutral-100"
                    onClick={() => setQty((p) => p + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    handleAddToCart(qty);
                  }}
                  disabled={isAdding}
                  className="h-12 flex-1 rounded-md bg-neutral-900 text-[14px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="mt-10 space-y-6 rounded-lg bg-neutral-50 p-6">
              <div className="text-[14px] leading-relaxed text-neutral-700">
                <p className="line-clamp-4">{bookDetail.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 text-[12px] uppercase tracking-wider text-neutral-500">
                <div>
                  <p className="font-bold text-neutral-900">Pages</p>
                  <p className="mt-1">{bookDetail.pageCount || "N/A"}</p>
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Weight</p>
                  <p className="mt-1">
                    {bookDetail.weightGrams
                      ? `${(bookDetail.weightGrams / 1000).toFixed(2)} kg`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="mt-12 border-l-2 border-neutral-900 pl-6 py-2">
              <p className="text-lg font-serif italic text-neutral-800 leading-relaxed">
                &ldquo;Strategy without tactics is the slowest route to victory.
                Tactics without strategy is the noise before defeat.&rdquo;
              </p>
              <cite className="mt-4 block text-[12px] font-bold uppercase tracking-widest text-neutral-500 not-italic">
                — Sun Tzu, The Art of War
              </cite>
            </div>
          </section>
        </div>
      </div>

      <section className="mt-20 border-t border-neutral-100">
        <div className="mx-auto max-w-5xl">
          {/* Read More Section */}
          <Collapsible
            open={readMoreOpen}
            onOpenChange={setReadMoreOpen}
            className="border-b border-neutral-100"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-8 text-[13px] font-bold uppercase tracking-[0.2em]">
              <span>Product Description</span>
              {readMoreOpen ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-12 transition-all">
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="prose prose-neutral max-w-none text-[15px] leading-8 text-neutral-600">
                  <h3 className="font-serif text-2xl text-neutral-900">
                    {bookDetail.title}
                  </h3>
                  <p className="mt-4">{bookDetail.description}</p>
                </div>
                <div className="space-y-6 text-[14px]">
                  <div className="rounded-sm border border-neutral-100 p-6">
                    <h4 className="mb-4 font-bold uppercase tracking-widest text-neutral-900">
                      Specification
                    </h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between border-b border-neutral-50 pb-2">
                        <dt className="text-neutral-500">Publisher</dt>
                        <dd className="font-medium">
                          {bookDetail.publisherName || "—"}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b border-neutral-50 pb-2">
                        <dt className="text-neutral-500">Format</dt>
                        <dd className="font-medium">Paperback, 6x9 inches</dd>
                      </div>
                      <div className="flex justify-between border-b border-neutral-50 pb-2">
                        <dt className="text-neutral-500">ISBN-13</dt>
                        <dd className="font-medium">978-0123456789</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Reviews Section */}
          <Collapsible
            open={reviewsOpen}
            onOpenChange={setReviewsOpen}
            className="border-b border-neutral-100"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-8 text-[13px] font-bold uppercase tracking-[0.2em]">
              <span>Customer Reviews ({bookDetail.ratingCount})</span>
              {reviewsOpen ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-12">
              <div className="text-center py-10">
                <div className="mb-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < (bookDetail.ratingAvg || 0)
                          ? "fill-black text-black"
                          : "text-neutral-200",
                      )}
                    />
                  ))}
                </div>
                <p className="text-neutral-500">{t("detail.noReviews")}</p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-none px-8 uppercase tracking-widest text-[11px] font-bold"
                >
                  Write a review
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* RELAXED PRODUCTS */}
      <section className="bg-neutral-50 py-20">
        <div className="container-main">
          <RecommendedSection
            books={bookDetail?.recommend ?? []}
            title="Các sản phẩm tương tự"
          />
        </div>
      </section>
    </main>
  );
}
