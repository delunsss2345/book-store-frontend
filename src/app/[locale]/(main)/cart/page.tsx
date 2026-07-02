"use client";

import {
  useCartQuery,
  useRemoveItemMutation,
  useUpdateQtyMutation,
} from "@/features/cart/hooks";
import { useOrderStore } from "@/features/orders/store/order.store";
import { CartGroup, GroupedCartItem } from "@/types/response/cart.response";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { CartSkeleton } from "./_components/CartSkeleton";
import { CartSummaryPanel } from "./_components/CartSummaryPanel";

const fmt = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export default function ShoppingCartPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { data: cart, isPending, isError } = useCartQuery();
  const updateQtyMutation = useUpdateQtyMutation();
  const removeItemMutation = useRemoveItemMutation();

  // ─── Zustand selection state ─────────────────────────────────────────────
  const storeItems = useOrderStore((s) => s.items);
  const setItems = useOrderStore((s) => s.setItems);

  // Set of selected bookVariantIds (derived from store)
  const selectedVariantIds = useMemo(
    () => new Set(storeItems.map((i) => i.bookVariantId)),
    [storeItems],
  );

  const allItems = useMemo<GroupedCartItem[]>(
    () => (cart?.groups ?? []).flatMap((g) => g.items),
    [cart],
  );

  const allVariantIds = useMemo(
    () => allItems.map((i) => Number(i.variant.id ?? i.bookVariantId)),
    [allItems],
  );

  const isAllSelected =
    allVariantIds.length > 0 &&
    allVariantIds.every((id) => selectedVariantIds.has(id));
  const isIndeterminate =
    !isAllSelected && allVariantIds.some((id) => selectedVariantIds.has(id));

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const itemToCheckout = useCallback(
    (item: GroupedCartItem) => ({
      bookVariantId: Number(item.variant.id ?? item.bookVariantId),
      quantity: item.quantity,
    }),
    [],
  );

  const buildItems = useCallback(
    (nextVariantIds: Set<number>) =>
      allItems
        .filter((i) =>
          nextVariantIds.has(Number(i.variant.id ?? i.bookVariantId)),
        )
        .map(itemToCheckout),
    [allItems, itemToCheckout],
  );

  // ─── Toggle actions ───────────────────────────────────────────────────────
  const toggleItem = useCallback(
    (item: GroupedCartItem) => {
      const vid = Number(item.variant.id ?? item.bookVariantId);
      const next = new Set(selectedVariantIds);
      next.has(vid) ? next.delete(vid) : next.add(vid);
      setItems(buildItems(next));
    },
    [selectedVariantIds, buildItems, setItems],
  );

  const toggleGroup = useCallback(
    (items: GroupedCartItem[]) => {
      const groupVids = items.map((i) =>
        Number(i.variant.id ?? i.bookVariantId),
      );
      const allChecked = groupVids.every((id) => selectedVariantIds.has(id));
      const next = new Set(selectedVariantIds);
      groupVids.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
      setItems(buildItems(next));
    },
    [selectedVariantIds, buildItems, setItems],
  );

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setItems([]);
    } else {
      setItems(allItems.map(itemToCheckout));
    }
  }, [isAllSelected, allItems, itemToCheckout, setItems]);

  // ─── Derived ─────────────────────────────────────────────────────────────
  const selectedItems = allItems.filter((i) =>
    selectedVariantIds.has(Number(i.variant.id ?? i.bookVariantId)),
  );
  const currencyCode = allItems[0]?.variant.currencyCode ?? "VND";

  // ─── Checkout handler ─────────────────────────────────────────────────────
  const handleCheckout = useCallback(() => {
    // items already in store — just navigate
    router.push(`/${locale}/checkout`);
  }, [router, locale]);

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (isPending) return <CartSkeleton />;

  if (isError) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <p className="text-sm text-ink-3">{t("cart.page.loadError")}</p>
      </div>
    );
  }

  const groups: CartGroup[] = cart?.groups ?? [];
  const isEmpty =
    groups.length === 0 || groups.every((g) => g.items.length === 0);

  return (
    <div className="bg-paper min-h-screen">
      <div className="px-4 sm:px-6 py-10 lg:px-10 max-w-7xl mx-auto">
        {/* ── Page header ── */}
        <div className="flex items-baseline gap-4 mb-10">
          <h1 className="display text-[26px] font-semibold uppercase tracking-tight text-ink">
            {locale === "vi" ? "Giỏ hàng" : "Your Cart"}
          </h1>
          {!isEmpty && (
            <span className="text-[13px] text-ink-3">
              {allItems.length} {locale === "vi" ? "sản phẩm" : "items"}
            </span>
          )}
        </div>

        {isEmpty ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center border border-dashed border-line rounded-sm">
            <div className="h-14 w-14 rounded-full bg-surface flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-ink-3" />
            </div>
            <div>
              <p className="text-[15px] font-medium text-ink">
                {t("cart.page.empty")}
              </p>
              <p className="text-[13px] text-ink-3 mt-1">
                {locale === "vi"
                  ? "Hãy thêm sách vào giỏ để tiến hành đặt hàng."
                  : "Add some books to start shopping."}
              </p>
            </div>
            <button
              onClick={() => router.push(`/${locale}/books`)}
              className="btn-ink px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              {locale === "vi" ? "Khám phá sách" : "Browse Books"}
            </button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] items-start">
            {/* ── Left: Cart groups ── */}
            <div>
              {/* Select all row */}
              <div className="flex items-center gap-3 pb-4 border-b border-line mb-6">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <span
                    role="checkbox"
                    aria-checked={
                      isAllSelected
                        ? "true"
                        : isIndeterminate
                          ? "mixed"
                          : "false"
                    }
                    onClick={toggleAll}
                    className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                      ${isAllSelected ? "bg-ink border-ink" : "border-line bg-paper group-hover:border-ink-3"}`}
                  >
                    {isAllSelected && (
                      <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                        <path
                          d="M1 5l3 4 7-8"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {isIndeterminate && !isAllSelected && (
                      <span className="w-2 h-0.5 bg-ink-3 rounded-full" />
                    )}
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-2">
                    {locale === "vi" ? "Chọn tất cả" : "Select all"}
                  </span>
                </label>
                {selectedVariantIds.size > 0 && (
                  <span className="ml-auto text-[12px] text-ink-3">
                    {selectedVariantIds.size}{" "}
                    {locale === "vi" ? "đã chọn" : "selected"}
                  </span>
                )}
              </div>

              {/* Groups */}
              <div className="space-y-10">
                {groups.map((group) => {
                  const groupVids = group.items.map((i) =>
                    Number(i.variant.id ?? i.bookVariantId),
                  );
                  const allGroupChecked = groupVids.every((id) =>
                    selectedVariantIds.has(id),
                  );
                  const someGroupChecked = groupVids.some((id) =>
                    selectedVariantIds.has(id),
                  );

                  return (
                    <section key={group.date}>
                      {/* Group header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          role="checkbox"
                          aria-checked={
                            allGroupChecked
                              ? "true"
                              : someGroupChecked
                                ? "mixed"
                                : "false"
                          }
                          onClick={() => toggleGroup(group.items)}
                          className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                            ${allGroupChecked ? "bg-ink border-ink" : "border-line bg-paper hover:border-ink-3"}`}
                        >
                          {allGroupChecked && (
                            <svg
                              viewBox="0 0 12 10"
                              fill="none"
                              className="w-3 h-2.5"
                            >
                              <path
                                d="M1 5l3 4 7-8"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {!allGroupChecked && someGroupChecked && (
                            <span className="w-2 h-0.5 bg-ink-3 rounded-full" />
                          )}
                        </span>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-3">
                            {locale === "vi" ? "Ngày thêm" : "Added on"}
                          </p>
                          <p className="text-[13px] font-semibold text-ink">
                            {group.date}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-line border-t border-b border-line">
                        {group.items.map((item) => {
                          const vid = Number(
                            item.variant.id ?? item.bookVariantId,
                          );
                          const isChecked = selectedVariantIds.has(vid);
                          const itemTotal =
                            Number(item.variant.price) * item.quantity;

                          return (
                            <div
                              key={item.id}
                              className={`flex items-center gap-4 py-5 transition-colors ${isChecked ? "bg-surface/40" : ""}`}
                            >
                              {/* Checkbox */}
                              <span
                                role="checkbox"
                                aria-checked={isChecked}
                                onClick={() => toggleItem(item)}
                                className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                                  ${isChecked ? "bg-ink border-ink" : "border-line bg-paper hover:border-ink-3"}`}
                              >
                                {isChecked && (
                                  <svg
                                    viewBox="0 0 12 10"
                                    fill="none"
                                    className="w-3 h-2.5"
                                  >
                                    <path
                                      d="M1 5l3 4 7-8"
                                      stroke="white"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </span>

                              {/* Cover */}
                              <div className="h-[96px] w-[66px] shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
                                {item.book.coverImageUrl ? (
                                  <img
                                    src={item.book.coverImageUrl}
                                    alt={item.book.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-surface">
                                    <ShoppingBag className="h-5 w-5 text-line" />
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="line-clamp-2 text-[13px] font-semibold text-ink leading-snug">
                                  {item.book.title}
                                </h3>
                                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-3 font-medium">
                                  {item.variant.format}
                                </p>
                                <p className="mt-2 text-[13px] font-semibold text-ink-2">
                                  {fmt.format(Number(item.variant.price))}{" "}
                                  <span className="text-[10px] font-normal text-ink-3">
                                    {item.variant.currencyCode}
                                  </span>
                                </p>
                              </div>

                              {/* Qty stepper */}
                              <div className="flex items-center gap-0 shrink-0">
                                <button
                                  className="h-7 w-7 flex items-center justify-center border border-line rounded-l-sm hover:bg-surface transition-colors disabled:opacity-40"
                                  onClick={() =>
                                    updateQtyMutation.mutate({
                                      id: String(item.id),
                                      delta: -1,
                                    })
                                  }
                                  disabled={
                                    updateQtyMutation.isPending ||
                                    item.quantity <= 1
                                  }
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3 text-ink-2" />
                                </button>
                                <span className="h-7 w-9 flex items-center justify-center border-y border-line text-[13px] font-semibold text-ink bg-paper">
                                  {item.quantity}
                                </span>
                                <button
                                  className="h-7 w-7 flex items-center justify-center border border-line rounded-r-sm hover:bg-surface transition-colors disabled:opacity-40"
                                  onClick={() =>
                                    updateQtyMutation.mutate({
                                      id: String(item.id),
                                      delta: 1,
                                    })
                                  }
                                  disabled={
                                    updateQtyMutation.isPending ||
                                    item.quantity >= (item.variant.stock ?? 999)
                                  }
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3 text-ink-2" />
                                </button>
                              </div>

                              {/* Total + remove */}
                              <div className="text-right shrink-0 w-[100px]">
                                <p className="text-[14px] font-bold text-ink">
                                  {fmt.format(itemTotal)}
                                </p>
                                <p className="text-[10px] text-ink-3 mb-2">
                                  {item.variant.currencyCode}
                                </p>
                                <button
                                  onClick={() =>
                                    removeItemMutation.mutate(String(item.id))
                                  }
                                  disabled={removeItemMutation.isPending}
                                  aria-label="Remove item"
                                  className="text-line-2 hover:text-red-500 transition-colors disabled:opacity-40"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Summary panel ── */}
            <CartSummaryPanel
              selectedItems={selectedItems}
              selectedCount={selectedVariantIds.size}
              currencyCode={currencyCode}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}
