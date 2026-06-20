"use client";

import {
  useCartQuery,
  useRemoveItemMutation,
  useUpdateQtyMutation,
} from "@/features/cart/hooks";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import { fmt } from "@/utils/format-number-vi";
import { Minus, Plus, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ShipFee } from "../../../../constants/enums/order";

const numberFormatter = new Intl.NumberFormat("en-US", {
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
  const items = cart?.items ?? [];

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  if (isPending) {
    return (
      <div className="container-main w-full py-10 min-h-[50vh] space-y-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_120px_100px_120px] items-center gap-x-4 py-4"
          >
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-4 w-16 justify-self-center" />
            <Skeleton className="h-8 w-24 justify-self-center" />
            <Skeleton className="h-4 w-16 justify-self-end" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-main w-full py-10 min-h-[50vh] text-sm text-zinc-500">
        {t("cart.page.loadError")}
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="px-6 py-10 lg:px-10 max-w-7xl mx-auto">
        <h1 className="display text-[26px] font-semibold uppercase tracking-tight text-ink">
          Your Cart
        </h1>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_340px]">
          {/* Left: Cart Items */}
          <div>
            <div className="grid grid-cols-[1fr_110px_120px_110px] border-b border-line pb-4 text-[10px] font-semibold uppercase tracking-widest text-ink-3">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {items.length > 0 ? (
              items.map((item) => {
                const id = item.id ?? item.bookVariantId;
                const itemTitle = item.variant.book.translations[0].title;
                const itemDesc = item.variant.book.translations[0].description;
                const currencyCode = item.variant.currencyCode;

                return (
                  <div
                    key={id}
                    className="grid grid-cols-[1fr_110px_120px_110px] items-center gap-x-4 border-b border-line py-7 group"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        className="text-line-2 transition hover:text-accent"
                        title="Remove item"
                        onClick={() => removeItemMutation.mutate(String(id))}
                        disabled={removeItemMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="h-[100px] w-[70px] shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
                        <img
                          src={item.variant.book?.coverImageUrl ?? ""}
                          alt={itemTitle}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-1 text-[14px] font-semibold text-ink">
                          {itemTitle}
                        </h3>
                        {itemDesc && (
                          <p className="mt-1 line-clamp-2 text-[12px] italic leading-relaxed text-ink-3">
                            {itemDesc}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="text-center text-[13px] text-ink-2">
                      {numberFormatter.format(parseFloat(item.variant.price))}
                      <span className="ml-1 text-[10px] text-ink-3">
                        {currencyCode}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center rounded-md border border-line">
                        <button
                          className="px-2 py-1.5 hover:bg-paper"
                          onClick={() =>
                            updateQtyMutation.mutate({
                              id: String(id),
                              delta: -1,
                            })
                          }
                          disabled={updateQtyMutation.isPending}
                        >
                          <Minus className="h-3 w-3 text-ink-3" />
                        </button>
                        <span className="w-8 border-x border-line py-1 text-center text-[12px] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1.5 hover:bg-paper"
                          onClick={() =>
                            updateQtyMutation.mutate({
                              id: String(id),
                              delta: 1,
                            })
                          }
                          disabled={updateQtyMutation.isPending}
                        >
                          <Plus className="h-3 w-3 text-ink-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="text-right text-[14px] font-bold text-ink">
                      {numberFormatter.format(
                        parseFloat(item.variant.price) * item.quantity,
                      )}
                      <span className="ml-1 text-[10px] font-normal text-ink-3">
                        {currencyCode}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center text-sm text-ink-3 border-b border-line border-dashed">
                {t("cart.page.empty")}
              </div>
            )}
          </div>

          {/* Right: Summary Sidebar */}
          <div className="h-fit space-y-6">
            <div className="border border-line bg-surface p-6 shadow-sm">
              <h2 className="border-b border-line pb-4 text-[12px] font-black uppercase tracking-[0.2em] text-ink">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4 text-[14px]">
                <div className="flex justify-between text-ink-2">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">
                    {numberFormatter.format(subtotal)}{" "}
                    {items[0]?.variant.currencyCode ?? ""}
                  </span>
                </div>
                <div className="flex justify-between text-ink-2">
                  <span>Shipping</span>
                  <span className="font-semibold text-ok uppercase">
                    {fmt(ShipFee) === "0 ₫" ? "Free" : fmt(ShipFee)}
                  </span>
                </div>

                <div className="my-4 hairline"></div>

                <div className="flex justify-between text-[18px] font-bold text-ink">
                  <span>Total</span>
                  <span>
                    {numberFormatter.format(subtotal + (subtotal > 0 ? ShipFee : 0))}{" "}
                    {items[0]?.variant.currencyCode ?? ""}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/${locale}/checkout`)}
                className="btn-ink mt-8 block w-full rounded-none py-4 text-center text-[10px] font-bold uppercase tracking-[0.25em]"
                disabled={items.length === 0}
              >
                Checkout Now
              </button>
            </div>

            <p className="px-4 text-center text-[10px] leading-relaxed text-ink-3">
              Shipping, taxes, and discounts will be calculated during the
              checkout process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
