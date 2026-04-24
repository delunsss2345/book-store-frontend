"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LibraryBook } from "@/types/library";
import useTranslator from "@/hooks/use-translator";

interface BookDetailHeaderProps {
  book: LibraryBook;
  notesCount: number;
}

export const BookDetailHeader = ({ book, notesCount }: BookDetailHeaderProps) => {
  const { t } = useTranslator();
  const locale = useLocale();

  return (
    <div className="mb-8">
      {/* Back navigation */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <Link href={`/${locale}/profile/library`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("library.detail.backToLibrary")}
        </Link>
      </Button>

      {/* Book Hero */}
      <div className="flex gap-6">
        {/* Cover */}
        <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted shadow-md sm:h-48 sm:w-32">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">
            {book.title}
          </h1>
          <Badge variant="secondary" className="w-fit text-xs">
            {t("library.card.notesCount", { count: notesCount })}
          </Badge>
        </div>
      </div>
    </div>
  );
};
