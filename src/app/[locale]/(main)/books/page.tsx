"use client";

import { useBooksQuery } from "@/features/catalog/hooks/use-books.mutation";
import {
  selectorBooksLimit,
  selectorBooksPage,
  selectorBooksTotal,
  selectorBooksTotalPages,
  selectorSetBooksMeta,
  selectorSetBooksPage,
} from "@/features/catalog/selector/catalog.selector";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import BooksGridSkeletonCard from "@/src/app/[locale]/(main)/books/_components/BookGridSkeleton";
import { SlidersHorizontal } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BookCard from "../_components/BookCard";
import { BooksPagination } from "./_components/BooksPagiantion";
import { FilterContent } from "./_components/FilterContent";
import { sortOptions } from "./_components/filter.data";
import useTranslator from "@/hooks/use-translator";

function AllTitlesContent() {
  const { t } = useTranslator();
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const booksPage = useCatalogStore(selectorBooksPage);
  const booksLimit = useCatalogStore(selectorBooksLimit);
  const booksTotal = useCatalogStore(selectorBooksTotal);
  const booksTotalPages = useCatalogStore(selectorBooksTotalPages);
  const setBooksPage = useCatalogStore(selectorSetBooksPage);
  const setBooksMeta = useCatalogStore(selectorSetBooksMeta);

  const searchParams = useSearchParams();
  const slugCategory = searchParams.get("search");
  const keyword = searchParams.get("keyword");
  const locale = useLocale();

  const { data: bookList, isPending } = useBooksQuery({
    page: booksPage,
    limit: booksLimit,
    ...(slugCategory && { slugCategory }),
    ...(keyword && { keyword }),
  });

  useEffect(() => {
    if (bookList) {
      setBooksMeta({
        page: bookList.page,
        limit: bookList.limit,
        total: bookList.total,
        totalPages: bookList.totalPages,
      });
    }
  }, [bookList, setBooksMeta]);

  useEffect(() => {
    setBooksPage(1);
  }, [slugCategory, keyword, setBooksPage]);

  const filterProps = {
    sortOpen,
    setSortOpen,
    selectedSort,
    setSelectedSort,
    selectedPrice,
    setSelectedPrice,
  };

  const books = bookList?.items ?? [];

  return (
    <div className="relative bg-paper w-full min-h-screen">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[300px_1fr]">
          {/* Sidebar Filter */}
          <FilterContent {...filterProps} />

          {/* Main Grid Area */}
          <div className="px-6 py-7 lg:px-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-3">
              <Link href={`/${locale}`} className="hover:text-ink">
                {t("catalog.home")}
              </Link>
              <span>/</span>
              <span className="text-ink-2">
                {t("catalog.books", { count: booksTotal })}
              </span>
            </div>

            {/* Header row */}
            <div className="mt-3 flex items-center justify-between">
              <h1 className="display text-[26px] font-semibold tracking-tight text-ink">
                {t("catalog.title")}
              </h1>

              {/* Mobile Filter Button */}
              <button className="btn-ink h-9 flex items-center justify-center gap-2 rounded-none px-4 text-[11px] uppercase tracking-wider lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                {t("catalog.sortAndFilter")}
              </button>
            </div>

            {/* Book grid */}
            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
              {isPending
                ? Array.from({ length: 12 }).map((_, index) => (
                    <BooksGridSkeletonCard key={`books-skeleton-${index}`} />
                  ))
                : books.map((book) => (
                    <BookCard
                      key={book.id}
                      title={book.title}
                      description={book.description ?? ""}
                      {...(book.price != null && { price: Number(book.price) })}
                      bookVariantId={Number(book.bookVariantId ?? 0)}
                      currency={book.currencyCode ?? "VND"}
                      imageUrl={book.coverImageUrl ?? undefined}
                      href={`/detail/${book.slug ?? book.id}`}
                      variant="compact"
                    />
                  ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <BooksPagination
                page={booksPage}
                totalPages={booksTotalPages}
                onPageChange={setBooksPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllTitlesPage() {
  return (
    <Suspense
      fallback={
        <div className="relative bg-paper w-full min-h-screen">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-[300px_1fr]">
              <div className="w-[300px]" />
              <div className="mt-7 px-6 py-7 lg:px-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <BooksGridSkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AllTitlesContent />
    </Suspense>
  );
}
