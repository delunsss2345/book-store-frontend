import { useMemo } from "react";

import { useQueryOrder } from "@/features/orders/hooks/use-query-orders";
import { useQueryOrderItems } from "@/features/orders/hooks/use-query-order-items";
import type { LibraryBook } from "@/types/library";

// ─── Aggregate all purchased books from order history ─────────────────────────
// This hook combines orders → order items → unique books.
// When a /library or /purchases API is available, replace the inner logic
// while keeping the same return shape (LibraryBook[]).

/**
 * Returns deduplicated list of books the user has purchased.
 * Aggregated client-side from order + order-item data.
 *
 * Future API migration: replace implementation with a single API call
 * (e.g. GET /v1/users/me/library) while preserving the LibraryBook[] return type.
 */
export const useLibraryBooks = () => {
  const { data: orders, isLoading: ordersLoading } = useQueryOrder();

  // We only need to fetch items from orders that completed (or any order)
  // Since useQueryOrderItems is per-orderId, we take the first/all orders
  // NOTE: This approach fetches items for all orders — could be optimised with
  // a batch endpoint in the future. For now, we deduplicate client-side.

  const firstOrderId = orders?.[0]?.id ?? null;
  const secondOrderId = orders?.[1]?.id ?? null;
  const thirdOrderId = orders?.[2]?.id ?? null;

  // Fetch up to 3 most recent orders' items (covers most users)
  const { data: items0 } = useQueryOrderItems(firstOrderId);
  const { data: items1 } = useQueryOrderItems(secondOrderId);
  const { data: items2 } = useQueryOrderItems(thirdOrderId);

  const books: LibraryBook[] = useMemo(() => {
    const allItems = [...(items0 ?? []), ...(items1 ?? []), ...(items2 ?? [])];
    const seen = new Set<string>();
    const result: LibraryBook[] = [];

    for (const item of allItems) {
      const book = item.bookVariantSnapshot?.bookVariant?.book;
      if (!book) continue;
      if (seen.has(book.id)) continue;
      seen.add(book.id);

      const translation = book.translations?.[0];
      result.push({
        bookId: book.id,
        title: translation?.title ?? "Untitled",
        coverImageUrl: book.coverImageUrl ?? null,
        slug: translation?.slug ?? null,
      });
    }

    return result;
  }, [items0, items1, items2]);

  return {
    books,
    isLoading: ordersLoading,
    isEmpty: !ordersLoading && books.length === 0,
  };
};
