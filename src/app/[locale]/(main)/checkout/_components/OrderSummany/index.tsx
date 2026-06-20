import { ShipFee } from "@/constants/enums/order";
import { useCartQuery } from "@/features/cart/hooks";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { fmt } from "@/utils/format-number-vi";
import { Info, TicketPercent } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
type OrderSummaryProps = {
  cart: NonNullable<ReturnType<typeof useCartQuery>["data"]>;
  subtotal: number;
};
export function OrderSummary({ cart, subtotal }: OrderSummaryProps) {
  const t = useTranslations();
  const total = subtotal + ShipFee;

  return (
    <aside className="relative">
      <div className="sticky top-6 w-full rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-xl shadow-sm">
        <h3 className="mb-6 text-[17px] font-bold tracking-tight text-ink flex items-center gap-2">
          {t("checkout.orderSummary.title")}
          <span className="rounded-full bg-paper px-2.5 py-0.5 text-[12px] font-medium text-ink-3">
            {cart.items.length}
          </span>
        </h3>

        {/* Danh sách sản phẩm */}
        <div className="custom-scrollbar -mr-2 max-h-[320px] space-y-5 overflow-y-auto pr-2">
          {cart.items.map((item) => {
            const title =
              item.variant.book.translations[0]?.title ??
              t("checkout.orderSummary.productFallback");
            const price = parseFloat(item.variant.price);

            return (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative h-20 w-16 shrink-0 rounded-lg border border-zinc-100 bg-white shadow-sm overflow-hidden">
                  {item.variant.book.coverImageUrl && (
                    <Image
                      src={item.variant.book.coverImageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <span className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white shadow-md">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <p className="line-clamp-1 text-[14px] font-semibold text-ink">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-3">
                    {item.variant.format}
                  </p>
                  <p className="mt-1 text-[14px] font-bold text-ink">
                    {fmt(price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-6 hairline" />

        {/* Promo Code Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink-3">
            <TicketPercent className="h-3.5 w-3.5" />
            Promo Code
          </div>
          <div className="flex gap-2">
            <input
              placeholder={t("checkout.orderSummary.discountPlaceholder")}
              className="field flex-1 rounded-xl"
            />
            <button className="btn-outline h-11 rounded-xl px-5 text-[12px]">
              {t("checkout.orderSummary.apply")}
            </button>
          </div>
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
