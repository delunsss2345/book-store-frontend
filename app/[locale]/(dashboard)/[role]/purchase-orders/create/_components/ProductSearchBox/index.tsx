"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminBookVariantDetail, AdminBookVariantItem } from "@/types/response/admin-book-variant.response";
import { Book } from "@/types/response/variant.response";
import { Loader2, Plus, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookVariantPurchaseItem } from "../BookVariantItem";

export function ProductSearchBox({
  books,
  bookVariantPending,
  onAddItem,
  onOpenQuickCreate,
}: {
  books?: { items: AdminBookVariantItem[] };
  bookVariantPending: boolean;
  onAddItem: (variant: AdminBookVariantDetail, book: Book) => void;
  onOpenQuickCreate: (searchQuery: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredBooks = books?.items.filter((book) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.translations[0]?.title?.toLowerCase().includes(q) ||
      book.translations[0]?.description?.toLowerCase().includes(q)
    );
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (value.trim()) {
      setIsSearching(true);
      searchTimerRef.current = setTimeout(() => setIsSearching(false), 300);
    } else {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenQuickCreate = () => {
    onOpenQuickCreate(searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Tìm sách theo tên, ISBN hoặc mã..."
          className="pl-10 h-11 text-sm shadow-sm border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isSearchOpen && (
        <div className="absolute z-30 top-full mt-1 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
              <Loader2 className="size-4 animate-spin" />
              Đang tìm kiếm...
            </div>
          ) : !bookVariantPending &&
            filteredBooks &&
            filteredBooks.length > 0 ? (
            <div className="py-1">
              {filteredBooks.map((book) =>
                book.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => onAddItem(variant, book as unknown as Book)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-left cursor-pointer"
                  >
                    <BookVariantPurchaseItem variant={variant} book={book as unknown as Book} />
                  </button>
                )),
              )}
            </div>
          ) : searchQuery.trim() ? (
            <div className="py-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Không tìm thấy sản phẩm
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950/30 cursor-pointer"
                onClick={handleOpenQuickCreate}
              >
                <Plus className="size-3.5" />
                Tạo nhanh sản phẩm mới: &ldquo;{searchQuery}&rdquo;
              </Button>
            </div>
          ) : (
            <div className="py-4 px-4 text-sm text-muted-foreground">
              Nhập tên sách, ISBN hoặc mã để tìm kiếm...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
