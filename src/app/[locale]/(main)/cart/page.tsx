"use client";

import { useCartQuery, useRemoveItemMutation, useUpdateQtyMutation } from "@/features/cart/hooks";
import { CartGroup, GroupedCartItem } from "@/types/response/cart.response";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ShipFee } from "../../../../constants/enums/order";

const fmt = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  maximumFractionDigits: 0,
});

// ─── Skeleton loader ─────────────────────────────────────────────────────────

function CartSkeleton() {
  return (
    <div className="bg-paper min-h-screen">
      <div className="px-6 py-10 lg:px-10 max-w-7xl mx-auto space-y-10">
        <Skeleton className="h-8 w-48" />
        {[1, 2].map((g) => (
          <div key={g} className="space-y-4">
            <Skeleton className="h-5 w-40" />
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 py-5 border-b border-line">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-[100px] w-[70px] rounded-sm shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ShoppingCartPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { data: cart, isPending, isError } = useCartQuery();
  const updateQtyMutation = useUpdateQtyMutation();
  const removeItemMutation = useRemoveItemMutation();

  // ─── Selection state (Set of item ids) ──────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Flatten all items for convenience
  const allItems = useMemo<GroupedCartItem[]>(
    () => (cart?.groups ?? []).flatMap((g) => g.items),
    [cart]
  );
  const allIds = useMemo(() => allItems.map((i) => i.id), [allItems]);

  const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const isIndeterminate = !isAllSelected && allIds.some((id) => selectedIds.has(id));

  const toggleItem = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleGroup = useCallback(
    (items: GroupedCartItem[]) => {
      const groupIds = items.map((i) => i.id);
      const allChecked = groupIds.every((id) => selectedIds.has(id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        groupIds.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
        return next;
      });
    },
    [selectedIds]
  );

  const toggleAll = useCallback(() => {
    setSelectedIds(isAllSelected ? new Set() : new Set(allIds));
  }, [isAllSelected, allIds]);

  // ─── Selected subtotal ───────────────────────────────────────────────────
  const selectedItems = allItems.filter((i) => selectedIds.has(i.id));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? ShipFee : 0;
  const total = subtotal + shipping;
  const currencyCode = allItems[0]?.variant.currencyCode ?? "VND";

  // ─── Loading / Error states ──────────────────────────────────────────────
  if (isPending) return <CartSkeleton />;

  if (isError) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <p className="text-sm text-ink-3">{t("cart.page.loadError")}</p>
      </div>
    );
  }

  const groups: CartGroup[] = cart?.groups ?? [];
  const isEmpty = groups.length === 0 || groups.every((g) => g.items.length === 0);

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
              <p className="text-[15px] font-medium text-ink">{t("cart.page.empty")}</p>
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
                    aria-checked={isAllSelected ? "true" : isIndeterminate ? "mixed" : "false"}
                    onClick={toggleAll}
                    className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                      ${isAllSelected ? "bg-ink border-ink" : "border-line bg-paper group-hover:border-ink-3"}`}
                  >
                    {isAllSelected && (
                      <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                        <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
                {selectedIds.size > 0 && (
                  <span className="ml-auto text-[12px] text-ink-3">
                    {selectedIds.size} {locale === "vi" ? "đã chọn" : "selected"}
                  </span>
                )}
              </div>

              {/* Groups */}
              <div className="space-y-10">
                {groups.map((group) => {
                  const groupIds = group.items.map((i) => i.id);
                  const allGroupChecked = groupIds.every((id) => selectedIds.has(id));
                  const someGroupChecked = groupIds.some((id) => selectedIds.has(id));

                  return (
                    <section key={group.date}>
                      {/* Group header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          role="checkbox"
                          aria-checked={allGroupChecked ? "true" : someGroupChecked ? "mixed" : "false"}
                          onClick={() => toggleGroup(group.items)}
                          className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                            ${allGroupChecked ? "bg-ink border-ink" : "border-line bg-paper hover:border-ink-3"}`}
                        >
                          {allGroupChecked && (
                            <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                              <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
                          const isChecked = selectedIds.has(item.id);
                          const itemTotal = Number(item.variant.price) * item.quantity;

                          return (
                            <div
                              key={item.id}
                              className={`flex items-center gap-4 py-5 transition-colors ${isChecked ? "bg-surface/40" : ""}`}
                            >
                              {/* Checkbox */}
                              <span
                                role="checkbox"
                                aria-checked={isChecked}
                                onClick={() => toggleItem(item.id)}
                                className={`h-[18px] w-[18px] shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-colors
                                  ${isChecked ? "bg-ink border-ink" : "border-line bg-paper hover:border-ink-3"}`}
                              >
                                {isChecked && (
                                  <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                                    <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
                                    updateQtyMutation.mutate({ id: String(item.id), delta: -1 })
                                  }
                                  disabled={updateQtyMutation.isPending || item.quantity <= 1}
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
                                    updateQtyMutation.mutate({ id: String(item.id), delta: 1 })
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
                                  onClick={() => removeItemMutation.mutate(String(item.id))}
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

            {/* ── Right: Order summary ── */}
            <div className="h-fit space-y-4 lg:sticky lg:top-8">
              <div className="border border-line bg-surface p-6 shadow-sm">
                <h2 className="border-b border-line pb-4 text-[11px] font-black uppercase tracking-[0.2em] text-ink">
                  {locale === "vi" ? "Tóm tắt đơn hàng" : "Order Summary"}
                </h2>

                <div className="mt-5 space-y-3 text-[13px]">
                  <div className="flex justify-between text-ink-2">
                    <span>
                      {locale === "vi" ? "Tạm tính" : "Subtotal"}
                      {selectedItems.length > 0 && (
                        <span className="ml-1 text-ink-3 text-[11px]">
                          ({selectedItems.length}{" "}
                          {locale === "vi" ? "sản phẩm" : "items"})
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-ink">
                      {fmt.format(subtotal)} {currencyCode}
                    </span>
                  </div>

                  <div className="flex justify-between text-ink-2">
                    <span>{locale === "vi" ? "Vận chuyển" : "Shipping"}</span>
                    <span className="font-semibold text-ok uppercase text-[12px]">
                      {shipping === 0
                        ? locale === "vi" ? "Miễn phí" : "Free"
                        : `${fmt.format(shipping)} ${currencyCode}`}
                    </span>
                  </div>

                  <div className="my-3 hairline" />

                  <div className="flex justify-between text-[17px] font-bold text-ink">
                    <span>{locale === "vi" ? "Tổng cộng" : "Total"}</span>
                    <span>
                      {fmt.format(total)} {currencyCode}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/${locale}/checkout`)}
                  className="btn-ink mt-7 block w-full rounded-none py-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedIds.size === 0}
                >
                  {locale === "vi"
                    ? `Thanh toán${selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}`
                    : `Checkout${selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}`}
                </button>

                {selectedIds.size === 0 && (
                  <p className="mt-3 text-center text-[11px] text-ink-3">
                    {locale === "vi"
                      ? "Chọn ít nhất 1 sản phẩm để thanh toán"
                      : "Select at least 1 item to checkout"}
                  </p>
                )}
              </div>

              <p className="px-2 text-center text-[10px] leading-relaxed text-ink-3">
                {locale === "vi"
                  ? "Phí vận chuyển và ưu đãi sẽ được tính trong quá trình thanh toán."
                  : "Shipping, taxes, and discounts will be calculated during checkout."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
