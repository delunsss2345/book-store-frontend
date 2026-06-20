"use client";

import { useHomeQuery } from "@/features/catalog/hooks/use-home.mutation";
import { cn } from "@/lib/utils";
import { PricedBook } from "@/types/response/catalog.response";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import BookCard from "../BookCard";
import { BookCardSkeleton } from "@/src/components/common/Skeletons";

export function HomeBook() {
  const { data: home, isPending, isError } = useHomeQuery();
  const t = useTranslations();

  const newAndTrending = useMemo(() => home?.newAndTrending ?? [], [home]);

  return (
    <section className="container-main py-16 sm:py-24">
      <div className="relative">
        {/* Header: Làm cho tiêu đề trông nghệ thuật hơn một chút */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            {t("home.newAndTrending") || "New & Trending"}
          </h2>
          <div className="mt-4 h-[2px] w-12 bg-neutral-900" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-neutral-400">
            {t("home.handpicked") || "Handpicked for your collection"}
          </p>
        </div>

        {/* Trạng thái Loading */}
        {isPending && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Danh sách sản phẩm */}
        {!isPending && !isError && (
          <div
            className={cn(
              "grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 lg:grid-cols-4 transition-opacity duration-500",
              newAndTrending.length > 0 ? "opacity-100" : "opacity-0",
            )}
          >
            {newAndTrending.map((b) => {
              const book = b as PricedBook & {
                price: number;
                bookVariantId: number;
              };
              return (
                <BookCard
                  key={b.id}
                  title={b.title}
                  subtitle={b.title} // Bạn có thể đổi thành b.author nếu có
                  price={book.price}
                  currency="VND"
                  imageUrl={b.coverImageUrl}
                  href={`/detail/${b.slug ?? b.id}`}
                  bookVariantId={book.bookVariantId}
                />
              );
            })}
          </div>
        )}

        {/* Trạng thái lỗi: Làm cho nhẹ nhàng hơn */}
        {isError && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50/50 p-16 text-center">
            <p className="text-sm font-medium text-neutral-600">
              {t("home.error.fetch") ||
                "Something went wrong while fetching the books."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-4"
            >
              {t("home.error.tryAgain") || "Try again"}
            </button>
          </div>
        )}

        {/* Trạng thái trống */}
        {!isPending && !isError && newAndTrending.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center p-20 text-center">
            <p className="font-serif text-xl italic text-neutral-400">
              {t("home.empty") || "The shelves are currently being restocked."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
