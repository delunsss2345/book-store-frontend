"use client";

import { Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useBookMutation } from "@/features/catalog/hooks/use-book.mutation";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";


const formatMoney = (amount: string | number, currencyCode: string) => {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return `${amount} ${currencyCode}`;
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: currencyCode }).format(n);
  } catch {
    return `${n} ${currencyCode}`;
  }
};


function SeriesThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[100px] w-[76px] flex-shrink-0 overflow-hidden rounded-sm">
      <Image src={src} alt={alt} fill className="object-cover" sizes="76px" />
    </div>
  );
}



export default function DetailPage() {
  const [qty, setQty] = React.useState(1);
  const [active, setActive] = React.useState(0);
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const { slug } = useParams<{ slug: string }>();
  const bookMutation = useBookMutation(slug);
  const bookDetail = useCatalogStore(state => state.bookDetail)

  React.useEffect(() => {
    const getDetail = async () => {
      await bookMutation.mutateAsync()
    }

    getDetail();
  }, [])

  if (!bookDetail) return;
  if (bookMutation.isPending) return <Spinner />


  return (
    <div className="w-full bg-white text-neutral-900">
      <div className="container-main py-3">
        {/* ── Breadcrumb ── */}
        <nav className="text-[12px] tracking-wide text-neutral-500">
          <span>Home</span> <span className="mx-2 text-neutral-300">|</span>
          <span>Books</span> <span className="mx-2 text-neutral-300">|</span>
          <span>{bookDetail.categories?.[0]?.name ?? "Category"}</span>{" "}
          <span className="mx-2 text-neutral-300">|</span>
          <span className="text-neutral-900">{bookDetail.title}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-12 xl:grid-cols-12">
          <section className="xl:col-span-7">
            <div className="bg-white p-6">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-sm">
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[12px] text-neutral-500">
                {active + 1}
              </p>
              <div className="flex gap-2">

              </div>
            </div>
          </section>

          <section className="xl:col-span-5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold tracking-widest text-red-600">
              </span>
              <span className="rounded-sm border border-neutral-200 px-2 py-1 text-[12px] tracking-wide text-neutral-700">
              </span>
            </div>

            <h1 className="mt-4 font-serif text-[34px] leading-[1.1] tracking-tight">
              {bookDetail.title}
            </h1>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[22px] tracking-tight text-neutral-900">
              </p>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 hover:border-neutral-400"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[13px] text-neutral-500">More {bookDetail.title}</p>
              <div className="flex gap-3 overflow-x-auto pb-2">

              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center rounded-sm border border-neutral-200">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 rounded-none px-3"
                  onClick={() => setQty((p) => Math.max(1, p - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  className="h-10 w-14 rounded-none border-x border-neutral-200 text-center text-[13px]"
                  value={qty}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    setQty(Number.isFinite(next) && next > 0 ? next : 1);
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 rounded-none px-3"
                  onClick={() => setQty((p) => p + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="h-10 rounded-sm bg-neutral-900 px-6 text-[13px] font-medium tracking-wide hover:bg-neutral-800">
                Add to Cart
              </Button>
            </div>

            <div className="mt-8 space-y-1 text-[13px] leading-6 text-neutral-700">
              <p>
                Edition:{" "}
                <span className="text-neutral-900">
                  {bookDetail.variants.map((v) => v.format).join(", ")}
                </span>
              </p>
              <p>
                Availability:{" "}
                <span className="text-neutral-900">
                </span>
              </p>
            </div>

            <div className="mt-8 text-[15px] leading-7 text-neutral-800">
              <p>
                <span className="font-semibold text-neutral-900">{bookDetail.description}</span>
              </p>
              {bookDetail.categories?.length > 0 && (
                <p className="mt-2">
                  Categories:{" "}
                  <span className="font-semibold text-neutral-900">
                    {bookDetail.categories.map((c) => c.name).join(", ")}
                  </span>
                </p>
              )}
            </div>

            <p className="mt-8 text-[13px] text-neutral-500">
              {bookDetail.pageCount ? `${bookDetail.pageCount} pages` : "—"}
              {bookDetail.weightGrams ? ` • ${(bookDetail.weightGrams / 1000).toFixed(2)} kg` : ""}
            </p>

            <Button
              variant="outline"
              className="mt-8 h-10 rounded-sm border-neutral-200 px-5 text-[13px] tracking-wide text-neutral-900 hover:border-neutral-400"
            >
              Leave a review
            </Button>

            {/* 8) Quote */}
            <blockquote className="mt-10 border-l-0 text-[20px] font-semibold italic leading-8 text-neutral-900">
              &ldquo;Strategy without tactics is the slowest route to victory. Tactics without
              strategy is the noise before defeat.&rdquo;
              <footer className="mt-3 text-[13px] font-normal not-italic text-neutral-500">
                — Sun Tzu
              </footer>
            </blockquote>
          </section>
        </div>
      </div>

      <section className="mt-14 border-t border-neutral-200">
        <Collapsible open={readMoreOpen} onOpenChange={setReadMoreOpen}>
          <CollapsibleTrigger className="mx-auto flex w-full max-w-[1240px] items-center justify-center gap-3 px-6 py-6 text-[13px] font-medium tracking-widest text-neutral-900">
            <span className="uppercase">Read more</span>
            <span className="text-neutral-500">{readMoreOpen ? "—" : "+"}</span>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 pb-10 lg:grid-cols-2">
              <div className="space-y-4 text-[15px] leading-7 text-neutral-800">
                <h2 className="font-serif text-[26px] leading-tight">{bookDetail.title}</h2>
                <p className="text-neutral-600">
                  Categories:{" "}
                  {bookDetail.categories?.length
                    ? bookDetail.categories.map((c) => c.name).join(" • ")
                    : "—"}
                </p>
                <p>
                  Rating:{" "}
                  {bookDetail.ratingAvg ? `${bookDetail.ratingAvg} / 5` : "No rating yet"}{" "}
                  ({bookDetail.ratingCount} reviews)
                </p>
              </div>

              <div className="space-y-5 text-[15px] leading-7 text-neutral-800">
                <div>
                  <h3 className="font-semibold">Product details</h3>
                  <p className="mt-2 text-neutral-700">
                    Page count: {bookDetail.pageCount ?? "—"}
                  </p>
                  <p className="text-neutral-700">Weight: {bookDetail.weightGrams ?? "—"} g</p>
                  <p className="text-neutral-700">Publisher: {bookDetail.publisherName ?? "—"}</p>
                </div>

                <div>
                  <h3 className="font-semibold">ISBN</h3>
                  <p className="mt-2 text-neutral-700">
                    Paperback:{" "}
                    {bookDetail.variants.find((v) => v.format === "PAPERBACK")?.isbn ?? "—"}
                  </p>
                  <Link href="#" className="mt-2 inline-block text-neutral-900 underline underline-offset-4">
                    Download product images here
                  </Link>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={reviewsOpen} onOpenChange={setReviewsOpen} className="border-t border-neutral-200">
          <CollapsibleTrigger className="mx-auto flex w-full max-w-[1240px] items-center justify-center gap-3 px-6 py-6 text-[13px] font-medium tracking-widest text-neutral-900">
            <span className="uppercase">Customer reviews</span>
            <span className="text-neutral-500">{reviewsOpen ? "—" : "+"}</span>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mx-auto max-w-[1240px] px-6 pb-10">
              <div className="space-y-3">
                <p className="font-serif text-[22px]">{bookDetail.ratingCount} Ratings</p>
                <p className="text-[14px] text-neutral-600">
                  No reviews have been posted for this item yet. Be the first to rate this product.
                </p>
                <Button variant="outline" className="h-10 rounded-sm border-neutral-200 px-6 text-[13px]">
                  Submit a review
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      {/*  You may also like  */}
      <section className="border-t border-neutral-200 py-14">
        <div className="container-main">
          <h2 className="mb-12 text-center font-serif text-[32px] leading-none">You may also like</h2>

          <div className="grid place-items-start gap-x-14 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">

          </div>
        </div>
      </section>
    </div>
  );
}
