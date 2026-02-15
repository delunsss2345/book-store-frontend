"use client";

import { Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";

import BookCard from "@/app/(main)/_components/BookCard";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=2400&q=85";

const formatMoney = (amount: string | number, currencyCode: string) => {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return `${amount} ${currencyCode}`;
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: currencyCode }).format(n);
  } catch {
    return `${n} ${currencyCode}`;
  }
};

const relatedTitles = [
  {
    title: "Modern Tree Houses",
    subtitle: "Green Architecture",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "100 Contemporary",
    subtitle: "Wood Houses",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Green Architecture",
    subtitle: "Now!",
    price: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "LO-TEK Design",
    subtitle: "By Radical Indigenousism",
    price: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&w=600&q=80",
  },
];

function SeriesThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[100px] w-[76px] flex-shrink-0 overflow-hidden rounded-sm">
      <Image src={src} alt={alt} fill className="object-cover" sizes="76px" />
    </div>
  );
}

const data = {
  id: "196",
  title: "The Art of War",
  slug: "the-art-of-war",
  description: "Tác giả: Sun Tzu",
  coverImageUrl: null,
  publicationYear: null,
  pageCount: 198,
  weightGrams: 890,
  publisherName: "Unknown",
  ratingAvg: null,
  ratingCount: 0,
  variants: [
    {
      id: "604",
      format: "EBOOK",
      edition: 1,
      isbn: null,
      price: "119000",
      currencyCode: "VND",
      stock: 219,
    },
    {
      id: "603",
      format: "PAPERBACK",
      edition: 1,
      isbn: "9788467618174",
      price: "276000",
      currencyCode: "VND",
      stock: 136,
    },
  ],
  categories: [
    { id: "10", parentId: null, sortOrder: 10, name: "Kinh điển", slug: "kinh-dien" },
    { id: "24", parentId: null, sortOrder: 11, name: "Kinh doanh", slug: "kinh-doanh" },
  ],
  specs: {},
  badges: [],
  createdAt: "2026-02-14T12:43:03.850Z",
} as const;
export default function DetailPage() {
  const [qty, setQty] = React.useState(1);
  const [active, setActive] = React.useState(0);
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);
  const [reviewsOpen, setReviewsOpen] = React.useState(false);


  const gallery = React.useMemo(() => {
    const cover = data.coverImageUrl ?? DEFAULT_COVER;
    return [cover, cover, cover, cover];
  }, [data.coverImageUrl]);

  const primaryVariant = data.variants[0];
  const badgeText = data.badges.length > 0 ? data.badges[0] : "NEW";

  return (
    <div className="w-full bg-white text-neutral-900">
      <div className="container-main py-3">
        {/* ── Breadcrumb ── */}
        <nav className="text-[12px] tracking-wide text-neutral-500">
          <span>Home</span> <span className="mx-2 text-neutral-300">|</span>
          <span>Books</span> <span className="mx-2 text-neutral-300">|</span>
          <span>{data.categories?.[0]?.name ?? "Category"}</span>{" "}
          <span className="mx-2 text-neutral-300">|</span>
          <span className="text-neutral-900">{data.title}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-12 xl:grid-cols-12">
          <section className="xl:col-span-7">
            <div className="bg-white p-6">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-sm">
                <Image
                  src={gallery[active]}
                  alt={data.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1280px) 55vw, 100vw"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[12px] text-neutral-500">
                {active + 1} / {gallery.length}
              </p>
              <div className="flex gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={[
                      "relative h-14 w-12 overflow-hidden rounded-sm border transition",
                      i === active ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-400",
                    ].join(" ")}
                    aria-label={`Open image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="xl:col-span-5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold tracking-widest text-red-600">
                {badgeText}
              </span>
              <span className="rounded-sm border border-neutral-200 px-2 py-1 text-[12px] tracking-wide text-neutral-700">
                {primaryVariant?.format ?? "—"}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-[34px] leading-[1.1] tracking-tight">
              {data.title}
            </h1>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[22px] tracking-tight text-neutral-900">
                {primaryVariant
                  ? formatMoney(primaryVariant.price, primaryVariant.currencyCode)
                  : "—"}
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
              <p className="mb-3 text-[13px] text-neutral-500">More {data.title}</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {relatedTitles.map((r) => (
                  <SeriesThumb key={r.title} src={r.imageUrl} alt={r.title} />
                ))}
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
                  {data.variants.map((v) => v.format).join(", ")}
                </span>
              </p>
              <p>
                Availability:{" "}
                <span className="text-neutral-900">
                  {primaryVariant?.stock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="mt-8 text-[15px] leading-7 text-neutral-800">
              <p>
                <span className="font-semibold text-neutral-900">{data.description}</span>
              </p>
              {data.categories?.length > 0 && (
                <p className="mt-2">
                  Categories:{" "}
                  <span className="font-semibold text-neutral-900">
                    {data.categories.map((c) => c.name).join(", ")}
                  </span>
                </p>
              )}
            </div>

            <p className="mt-8 text-[13px] text-neutral-500">
              {primaryVariant?.format ?? "—"},{" "}
              {data.pageCount ? `${data.pageCount} pages` : "—"}
              {data.weightGrams ? ` • ${(data.weightGrams / 1000).toFixed(2)} kg` : ""}
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
                <h2 className="font-serif text-[26px] leading-tight">{data.title}</h2>
                <p className="text-neutral-600">
                  Categories:{" "}
                  {data.categories?.length
                    ? data.categories.map((c) => c.name).join(" • ")
                    : "—"}
                </p>
                <p>
                  Rating:{" "}
                  {data.ratingAvg ? `${data.ratingAvg} / 5` : "No rating yet"}{" "}
                  ({data.ratingCount} reviews)
                </p>
              </div>

              <div className="space-y-5 text-[15px] leading-7 text-neutral-800">
                <div>
                  <h3 className="font-semibold">Product details</h3>
                  <p className="mt-2 text-neutral-700">
                    Page count: {data.pageCount ?? "—"}
                  </p>
                  <p className="text-neutral-700">Weight: {data.weightGrams ?? "—"} g</p>
                  <p className="text-neutral-700">Publisher: {data.publisherName ?? "—"}</p>
                </div>

                <div>
                  <h3 className="font-semibold">ISBN</h3>
                  <p className="mt-2 text-neutral-700">
                    Paperback:{" "}
                    {data.variants.find((v) => v.format === "PAPERBACK")?.isbn ?? "—"}
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
                <p className="font-serif text-[22px]">{data.ratingCount} Ratings</p>
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
            {relatedTitles.map((book) => (
              <BookCard
                key={`${book.title}-${book.subtitle}`}
                title={book.title}
                subtitle={book.subtitle}
                price={book.price}
                imageUrl={book.imageUrl}
                badge="NEW"
                variant="compact"
                href="/detail/related-book"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
