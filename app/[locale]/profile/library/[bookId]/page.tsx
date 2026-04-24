"use client";

import { use, useMemo } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { useLibraryBooks } from "@/features/library/hooks/use-library-books";
import { useLibraryStore } from "@/features/library/store/library.store";
import { BookDetailHeader } from "./_components/BookDetailHeader";
import { NoteList } from "./_components/NoteList";
import { NoteForm } from "./_components/NoteForm";

interface BookDetailPageProps {
  params: Promise<{
    locale: string;
    bookId: string;
  }>;
}

export default function BookDetailPage(props: BookDetailPageProps) {
  const t = useTranslations("library");
  const params = use(props.params);
  
  const { books, isLoading } = useLibraryBooks();
  const notesByBook = useLibraryStore((s) => s.notesByBook);

  const bookId = params.bookId;
  const book = useMemo(() => books.find((b) => b.bookId === bookId), [books, bookId]);
  const notes = notesByBook[bookId] ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm">{t("page.loadingText")}</span>
      </div>
    );
  }

  if (!book) {
    return notFound();
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-muted/20 to-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <BookDetailHeader book={book} notesCount={notes.length} />

        <div className="space-y-8">
          <NoteForm bookId={bookId} />
          <div className="h-px w-full bg-border/50" />
          <NoteList bookId={bookId} />
        </div>
      </div>
    </section>
  );
}
