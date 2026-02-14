"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";

import BookCard from "@/app/(main)/_components/BookCard";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

const formatPrice = (price: number) => `US$ ${price}`;

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

const DetailPage = () => {
  const [qty, setQty] = React.useState(1);
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);
  const [reviewsOpen, setReviewsOpen] = React.useState(true);

  const thumbs = ["Homes 1", "Homes 2", "Homes 3", "Small Houses"];

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[var(--container-main)] px-6 py-6">
        <div className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="mx-2">|</span>
          <span>Books</span>
          <span className="mx-2">|</span>
          <span>Architecture &amp; Design</span>
          <span className="mx-2">|</span>
          <span className="text-foreground">Homes for Our Time. Sustainable Living</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-12">
          <section className="xl:col-span-8">
            <div className="relative overflow-hidden border bg-muted/10 p-6">
              <div
                className="mx-auto aspect-[3/4] max-w-[640px] bg-cover bg-center shadow-sm"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1400&q=80)",
                }}
              />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">1 / 25</p>
          </section>

          <section className="xl:col-span-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-red-600">NEW</span>
                  <span className="inline-flex h-8 items-center rounded-sm border px-3 text-sm">
                    XL
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-semibold leading-tight">
                  Homes for Our Time. Sustainable Living
                </h1>
                <p className="mt-3 text-3xl font-semibold">{formatPrice(80)}</p>
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8">
              <p className="text-xl font-medium">More Homes for Our Time</p>
              <div className="mt-3 flex gap-3">
                {thumbs.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="h-24 w-20 border bg-muted/20 text-[11px] text-muted-foreground"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="inline-flex items-center rounded-sm border bg-white">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 rounded-none px-3"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  className="h-10 w-14 rounded-none border-x text-center"
                  inputMode="numeric"
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
                  onClick={() => setQty((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="h-10 rounded-sm px-6 text-base">Add to Cart</Button>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p>Edition: Multilingual (English, French, German)</p>
              <p>Availability: In Stock</p>
            </div>

            <div className="mt-8 space-y-4 text-base leading-7">
              <p>
                <strong>The future of resourceful living:</strong> these cutting-edge examples of{" "}
                <strong>green buildings</strong> combine innovative design with eco-friendly
                solutions.
              </p>
              <p className="text-muted-foreground">Hardcover, 24.6 x 37.2 cm, 4.09 kg, 496 pages</p>
            </div>

            <Button variant="outline" className="mt-6 h-10 rounded-sm px-5 text-base">
              Leave a review
            </Button>

            <blockquote className="mt-8 text-xl leading-snug">
              “Today, the term ‘sustainability’ concerns not only the environmental cost of
              operating a home, but also that of building it.”
              <footer className="mt-2 text-base text-muted-foreground">— Philip Jodidio</footer>
            </blockquote>
          </section>
        </div>
      </div>

      <section className="border-t">
        <Collapsible open={readMoreOpen} onOpenChange={setReadMoreOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-center gap-3 py-6 text-3xl">
            <span>Read more</span>
            <span>{readMoreOpen ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mx-auto grid max-w-[var(--container-main)] grid-cols-1 gap-12 px-6 pb-10 lg:grid-cols-2">
              <div className="space-y-5 text-base leading-8">
                <h2 className="text-3xl font-semibold leading-tight">The Future of Housing</h2>
                <p className="text-xl">
                  The latest trends in green residential architecture from around the world
                </p>
                <p>
                  Travel across continents and climates to experience architecture that&apos;s
                  rewriting sustainability rules. Each project opens a window into dwellings inspired
                  by the possibilities of a warming planet.
                </p>
                <p>
                  Homes that strive to leave the lightest possible imprint, from low-impact
                  structures to recyclable materials, are beautifully photographed and annotated.
                </p>
              </div>

              <div className="space-y-5 text-base leading-8">
                <div>
                  <h3 className="text-2xl font-semibold">The author</h3>
                  <p className="mt-2">
                    <strong>Philip Jodidio</strong> studied art history and economics at Harvard and
                    edited Connaissance des Arts for over 20 years.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">Homes for Our Time. Sustainable Living</h3>
                  <p className="mt-2">Hardcover, 24.6 x 37.2 cm, 4.09 kg, 496 pages</p>
                  <p>ISBN 978-3-8365-9689-3</p>
                  <p>Edition: Multilingual (English, French, German)</p>
                  <Link href="#" className="underline underline-offset-4">
                    Download product images here
                  </Link>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={reviewsOpen} onOpenChange={setReviewsOpen} className="border-t">
          <CollapsibleTrigger className="flex w-full items-center justify-center gap-3 py-6 text-3xl">
            <span>Customer reviews</span>
            <span>{reviewsOpen ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mx-auto max-w-[var(--container-main)] px-6 pb-10">
              <div className="space-y-4">
                <p className="text-2xl font-semibold">0 Ratings</p>
                <p className="text-base text-muted-foreground">
                  No reviews have been posted for this item yet. Be the first to rate this product.
                </p>
                <Button variant="outline" className="h-11 rounded-sm px-6 text-base">
                  Submit a review
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section className="border-t py-10">
        <div className="mx-auto max-w-[var(--container-main)] px-6">
          <h2 className="mb-8 text-center text-4xl font-semibold">You may also like</h2>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {relatedTitles.map((book) => (
              <BookCard
                key={`${book.title}-${book.subtitle}`}
                title={book.title}
                subtitle={book.subtitle}
                price={book.price}
                imageUrl={book.imageUrl}
                variant="compact"
                href="/detail/related-book"
                className="mx-auto"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
