"use client";

import { ShipFee } from "@/constants/enums/order";
import { useCartQuery } from "@/features/cart/hooks";
import { useOrderStore } from "@/features/orders/store/order.store";
import { fmt } from "@/utils/format-number-vi";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

export function OrderSummary() {
  const t = useTranslations();
  const buyNow = useOrderStore((s) => s.buyNow);
  const storeItems = useOrderStore((s) => s.items);
  const { data: cart } = useCartQuery();

  // Build display items from store selection + cart data for book details
  const displayItems = useMemo(() => {
    if (buyNow) {
      return [
        {
          key: "buy_now",
          title: buyNow.book.title,
          coverImageUrl: buyNow.book.coverImageUrl ?? null,
          format: buyNow.variant.format,
          price: Number(buyNow.variant.price),
          quantity: buyNow.quantity,
        },
      ];
    }

    // Join store items with cart groups for display metadata
    const allCartItems = (cart?.groups ?? []).flatMap((g) => g.items);
    return storeItems.map((si) => {
      const cartItem = allCartItems.find(
        (ci) => ci.bookVariantId === si.bookVariantId,
      );
      return {
        key: String(si.bookVariantId),
        title: cartItem?.book.title ?? t("checkout.orderSummary.productFallback"),
        coverImageUrl: cartItem?.book.coverImageUrl ?? null,
        format: cartItem?.variant.format ?? "",
        price: cartItem ? Number(cartItem.variant.price) : 0,
        quantity: si.quantity,
      };
    });
  }, [buyNow, storeItems, cart, t]);

  const subtotal = useMemo(
    () => displayItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [displayItems],
  );
  const total = subtotal + ShipFee;

  return (
    <aside className="relative">
      <div className="sticky top-6 w-full rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-xl shadow-sm">
        <h3 className="mb-6 text-[17px] font-bold tracking-tight text-ink flex items-center gap-2">
          {t("checkout.orderSummary.title")}
          <span className="rounded-full bg-paper px-2.5 py-0.5 text-[12px] font-medium text-ink-3">
            {displayItems.length}
          </span>
        </h3>

        {/* Product list */}
        <div className="custom-scrollbar -mr-2 max-h-[320px] space-y-5 overflow-y-auto pr-2">
          {displayItems.map((item) => (
            <div key={item.key} className="flex gap-4 group">
              <div className="relative h-20 w-16 shrink-0 rounded-lg border border-zinc-100 bg-white shadow-sm overflow-hidden">
                {item.coverImageUrl && (
                  <Image
                    src={item.coverImageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-center min-w-0">
                <p className="line-clamp-1 text-[14px] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-3">
                  {item.format}
                  <span className="text-line-2">·</span>
                  <span>×{item.quantity}</span>
                </p>
                <p className="mt-1 text-[14px] font-bold text-ink">
                  {fmt(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3.5 border-t border-line pt-6 text-[14px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-3">Subtotal</span>
            <span className="font-medium text-ink">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-ink-3">
              Shipping
              <Info className="h-3.5 w-3.5 text-line-2" />
            </span>
            <span className="font-bold text-ok">
              {!ShipFee ? "Free" : fmt(ShipFee)}
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <span className="text-[16px] font-bold text-ink">Total</span>
            <div className="text-right">
              <span className="block text-[10px] font-bold uppercase tracking-tighter text-ink-3 leading-none">
                Vat Included
              </span>
              <span className="text-[24px] font-black tracking-tight text-ink">
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
