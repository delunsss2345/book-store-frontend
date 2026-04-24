"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { BookOpen, FileText } from "lucide-react";

import type { LibraryBook } from "@/types/library";
import { useLibraryStore } from "@/features/library/store/library.store";
import useTranslator from "@/hooks/use-translator";

interface BookCardProps {
  book: LibraryBook;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { t } = useTranslator();
  const locale = useLocale();
  const notes = useLibraryStore((s) => s.notesByBook[book.bookId]) ?? [];

  // Derive reading progress from the latest page_mark note
  const latestPage = notes
    .filter((n) => n.type === "page_mark" && n.pageNumber)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
    ?.pageNumber;

  return (
    <Link
      href={`/${locale}/profile/library/${book.bookId}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-border"
      aria-label={t("library.card.openBook")}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* Notes badge overlay */}
        {notes.length > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium backdrop-blur-sm shadow-sm">
            <FileText className="h-3 w-3 text-primary" />
            <span>{t("library.card.notesCount", { count: notes.length })}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
          {book.title}
        </h2>

        {/* Reading Progress */}
        {latestPage ? (
          <p className="text-xs text-muted-foreground">
            {t("library.card.page", { page: latestPage })}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic">
            {t("library.card.noNotes")}
          </p>
        )}
      </div>
    </Link>
  );
};
