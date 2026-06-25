"use client";

import type { AdminBookListData } from "@/types/response/admin.response";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type ProductAuthor = {
  authorName?: string | null;
};

type ProductTranslation = {
  title?: string | null;
};

type ProductPickerBook = Omit<AdminBookListData["items"][number], "authors"> & {
  authorName?: string | null;
  authors?: string | ProductAuthor | ProductAuthor[] | null;
  translation?: ProductTranslation | ProductTranslation[] | null;
  variants?: ProductPickerVariant[];
};

type ProductPickerVariant = {
  id: string;
  format: string;
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};

type ProductPickerSelectedBook = {
  id: string;
  translations: {
    id: string;
    languageId: number;
    title: string;
    description: string;
    slug: string;
  }[];
};

export function ProductPickerTable({
  booksData,
  bookPending,
  addedIds,
  search,
  onSearchChange,
  page,
  onPageChange,
  onAddItem,
}: {
  booksData?: AdminBookListData;
  bookPending: boolean;
  addedIds: Set<string>;
  search: string;
  onSearchChange: (v: string) => void;
  page: number;
  onPageChange: (page: number) => void;
  onAddItem: (
    variant: ProductPickerVariant,
    book: ProductPickerSelectedBook,
  ) => void;
}) {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const books = (booksData?.items ?? []) as ProductPickerBook[];
  const total = booksData?.total ?? 0;
  const totalPages = booksData?.totalPages ?? 1;
  const locale = params.locale ?? "vi";

  const getBookTitle = (book: ProductPickerBook) => {
    if (book.title) return book.title;
    const translation = book.translation;
    if (!translation) return "—";
    if (Array.isArray(translation)) {
      return translation[0]?.title ?? "—";
    }
    return translation.title ?? "—";
  };

  const getBookAuthors = (book: ProductPickerBook) => {
    if (book.authorName) return book.authorName;
    if (typeof book.authors === "string") return book.authors;
    if (Array.isArray(book.authors)) {
      return book.authors.map((author) => author.authorName).join(", ");
    }
    if (book.authors?.authorName) return book.authors.authorName;
    return "";
  };

  return (
    <div className="space-y-3">
      {/* Search filter */}
      <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-[13px] text-ink-3">
        <Search className="size-[13px] shrink-0" />
        <input
          className="flex-1 bg-transparent border-0 outline-none text-ink placeholder:text-ink-3/70 min-w-0"
          placeholder="Tìm theo tên sách hoặc tác giả (nhấn Enter hoặc đợi tự động load)..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-line bg-paper">
              <th className="px-4 py-2.5 text-left font-medium text-ink-2 w-10">
                #
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-ink-2">
                Sản phẩm
              </th>
              <th className="px-4 py-2.5 text-center font-medium text-ink-2 w-16">
                Thêm
              </th>
            </tr>
          </thead>
          <tbody>
            {bookPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td colSpan={3} className="px-4 py-3">
                    <div className="h-4 animate-pulse rounded bg-paper w-full" />
                  </td>
                </tr>
              ))
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-ink-3">
                  <div className="flex flex-col items-center gap-3">
                    <span>Không tìm thấy sản phẩm</span>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/${locale}/dashboard/books/create`)
                      }
                      className="btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
                    >
                      <Plus className="size-3.5" />
                      Tạo sách mới
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              books.map((book, idx) => {
                const title = getBookTitle(book);
                const authors = getBookAuthors(book);
                const stringId = String(book.id);
                const rowNum = (page - 1) * (booksData?.limit ?? 10) + idx + 1;
                const selectedVariant = book.variants?.[0] ?? {
                  id: stringId,
                  format: "PAPERBACK",
                  edition: 1,
                  isbn: "",
                  costPrice: "0",
                  price: "0",
                  currencyCode: "VND",
                  stock: 0,
                  isActive: true,
                };
                const isAdded = addedIds.has(String(selectedVariant.id));

                const mockBook = {
                  id: stringId,
                  translations: [
                    {
                      id: stringId,
                      languageId: 1,
                      title,
                      description: "",
                      slug: "",
                    },
                  ],
                };

                return (
                  <tr
                    key={book.id}
                    className={`border-b border-line last:border-0 transition-colors ${
                      isAdded
                        ? "bg-blue-50/60 dark:bg-blue-950/20"
                        : "hover:bg-paper/70"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-ink-3 tabular-nums">
                      {rowNum}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        {book.coverImageUrl ? (
                          <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded shadow-sm border border-line bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={book.coverImageUrl}
                              alt={title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded border border-line bg-paper">
                            <BookOpen className="size-4 text-ink-3" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span
                            className="font-semibold text-ink line-clamp-1"
                            title={title}
                          >
                            {title}
                          </span>
                          {authors && (
                            <span className="text-[11px] text-ink-3 truncate">
                              {authors}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => onAddItem(selectedVariant, mockBook)}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors ${
                          isAdded
                            ? "border-blue-300 bg-blue-100 text-blue-600 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                            : "border-line bg-paper text-ink-3 hover:border-ink hover:text-ink"
                        }`}
                        title={isAdded ? "Đã thêm" : "Thêm vào đơn"}
                      >
                        {isAdded ? (
                          <Check className="size-3.5" />
                        ) : (
                          <Plus className="size-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[12px] text-ink-3">
          <span>
            Tổng số: {total} sản phẩm · Trang {page}/{totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="icon-btn h-7 w-7 disabled:opacity-40"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="icon-btn h-7 w-7 disabled:opacity-40"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
