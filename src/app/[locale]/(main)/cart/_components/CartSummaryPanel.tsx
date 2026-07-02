"use client";

import { ShipFee } from "@/constants/enums/order";
import { GroupedCartItem } from "@/types/response/cart.response";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const fmt = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  maximumFractionDigits: 0,
});

type CartSummaryPanelProps = {
  selectedItems: GroupedCartItem[];
  selectedCount: number;
  currencyCode: string;
  onCheckout: () => void;
};

export function CartSummaryPanel({
  selectedItems,
  selectedCount,
  currencyCode,
  onCheckout,
}: CartSummaryPanelProps) {
  const locale = useLocale();

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? ShipFee : 0;
  const total = subtotal + shipping;

  return (
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
                ? locale === "vi"
                  ? "Miễn phí"
                  : "Free"
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
          onClick={onCheckout}
          className="btn-ink mt-7 block w-full rounded-none py-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedCount === 0}
        >
          {locale === "vi"
            ? `Thanh toán${selectedCount > 0 ? ` (${selectedCount})` : ""}`
            : `Checkout${selectedCount > 0 ? ` (${selectedCount})` : ""}`}
        </button>

        {selectedCount === 0 && (
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
  );
}
