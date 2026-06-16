"use client";

import BooksGridSkeletonCard from "@/src/app/[locale]/(main)/books/_components/BookGridSkeleton";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
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
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../_components/BookCard";
import { BooksPagination } from "./_components/BooksPagiantion";
import { FilterContent } from "./_components/FilterContent";
import { sortOptions } from "./_components/filter.data";

export default function AllTitlesPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const booksPage = useCatalogStore(selectorBooksPage);
  const booksLimit = useCatalogStore(selectorBooksLimit);
  const booksTotal = useCatalogStore(selectorBooksTotal);
  const booksTotalPages = useCatalogStore(selectorBooksTotalPages);
  const setBooksPage = useCatalogStore(selectorSetBooksPage);
  const setBooksMeta = useCatalogStore(selectorSetBooksMeta);
  const slugCategory = useSearchParams().get("search");
  const keyword = useSearchParams().get("keyword");
  const { data: bookList, isPending } = useBooksQuery({
    page: booksPage,
    limit: booksLimit,
    ...(slugCategory && { slugCategory }),
    ...(keyword && { keyword }),
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="container-main w-full pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 py-4 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-700">Books ({booksTotal} Items)</span>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">All Titles</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="default"
              className="gap-2 rounded-none bg-zinc-900 px-5 text-xs uppercase tracking-wider text-white hover:bg-zinc-800"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort and Filter
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[360px] overflow-y-auto p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle className="text-sm font-bold">
                Sort and Filter
              </SheetTitle>
            </SheetHeader>
            <FilterContent {...filterProps} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Book grid */}
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 bg-transparent">
          {isPending
            ? Array.from({ length: 12 }).map((_, index) => (
              <BooksGridSkeletonCard key={`books-skeleton-${index}`} />
            ))
            : books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                subtitle={book.title}
                price={Number(book.price ?? 0)}
                bookVariantId={Number(book.bookVariantId ?? 0)}
                currency={book.currencyCode ?? "VND"}
                imageUrl={book.coverImageUrl ?? undefined}
                href={`/detail/${book.slug ?? book.id}`}
                variant="compact"
              />
            ))}
        </div>

        {/* Pagination */}
        <BooksPagination
          page={booksPage}
          totalPages={booksTotalPages}
          onPageChange={setBooksPage}
        />
      </div>

      {/* Sticky floating filter button — appears on scroll */}
      {showStickyBtn && (
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded border border-zinc-200 bg-white shadow-lg transition-transform hover:scale-105"
              aria-label="Sort and Filter"
            >
              <SlidersHorizontal className="h-5 w-5 text-zinc-700" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[360px] overflow-y-auto p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle className="text-sm font-bold">
                Sort and Filter
              </SheetTitle>
            </SheetHeader>
            <FilterContent {...filterProps} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
