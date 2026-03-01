"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type BooksPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function BooksPagination({
  page,
  totalPages,
  onPageChange,
}: BooksPaginationProps) {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={!canGoPrev}
        className="text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-30"
        aria-label="First page"
      >
        <ChevronsLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={!canGoPrev}
        className="text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={!canGoNext}
        className="text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        className="text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-30"
        aria-label="Last page"
      >
        <ChevronsRight className="h-5 w-5" />
      </button>
    </div>
  );
}
