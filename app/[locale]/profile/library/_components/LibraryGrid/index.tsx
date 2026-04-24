"use client";

import type { LibraryBook } from "@/types/library";
import { BookCard } from "../BookCard";

interface LibraryGridProps {
  books: LibraryBook[];
}

export const LibraryGrid = ({ books }: LibraryGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {books.map((book, idx) => (
        <div
          key={book.bookId}
          style={{ animationDelay: `${idx * 60}ms` }}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};
