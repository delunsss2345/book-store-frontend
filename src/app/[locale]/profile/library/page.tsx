"use client";

import { Library, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { useLibraryBooks } from "@/features/library/hooks/use-library-books";
import { EmptyLibrary } from "./_components/EmptyLibrary";
import { LibraryGrid } from "./_components/LibraryGrid";

export default function LibraryPage() {
  const t = useTranslations("library");
  const { books, isLoading, isEmpty } = useLibraryBooks();

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-muted/20 to-background">
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Library className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">{t("page.title")}</h1>
          </div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("page.subtitle")}
          </p>
          {!isLoading && books.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground/60">
              {t("page.booksCount", { count: books.length })}
            </p>
          )}
        </header>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">{t("page.loadingText")}</span>
          </div>
        ) : isEmpty ? (
          <EmptyLibrary />
        ) : (
          <LibraryGrid books={books} />
        )}
      </div>
    </section>
  );
}
