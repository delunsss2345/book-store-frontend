"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartQuery } from "@/features/cart/hooks";
import { Minus, Plus, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ShipFee } from "../../../../constants/enums/order";
import { fmt } from "@/utils/format-number-vi";

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export default function ShoppingCartPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { data: cart, isPending, isError } = useCartQuery();

  const subtotal = cart?.items?.reduce(
    (sum, item) => sum + parseFloat(item.variant.price) * item.quantity,
    0,
  );

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
    <div className="container-main w-full py-10 min-h-[60vh]">
      <h1 className="text-xl font-bold tracking-tight uppercase">Your Cart</h1>

      <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_320px]">
        {/* Left: Cart Items */}
        <div>
          <div className="grid grid-cols-[1fr_120px_120px_120px] border-b pb-4 text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
          </div>

          {cart?.items && cart.items.length > 0 ? (
            cart.items.map((item) => {
              const itemTitle = item.variant.book.translations[0].title;
              const itemDesc = item.variant.book.translations[0].description;
              const currencyCode = item.variant.currencyCode;

              return (
                <div key={item.bookVariantId} className="group">
                  <div className="grid grid-cols-[1fr_120px_120px_120px] items-center gap-x-4 py-8">
                    {/* Product Info */}
                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        className="text-zinc-300 transition-colors hover:text-red-500"
                        title="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="h-[100px] w-[70px] shrink-0 overflow-hidden bg-zinc-100 border border-zinc-100">
                        <img
                          src={item.variant.book?.coverImageUrl ?? ""}
                          alt={itemTitle}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1">
                          {itemTitle}
                        </h3>
                        {itemDesc && (
                          <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed italic">
                            {itemDesc}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="text-center text-sm text-zinc-600">
                      {numberFormatter.format(parseFloat(item.variant.price))}
                      <span className="ml-1 text-[10px] text-zinc-400">
                        {currencyCode}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-zinc-200">
                        <button className="p-1.5 px-2 hover:bg-zinc-50 transition-colors">
                          <Minus className="h-3 w-3 text-zinc-500" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium border-x border-zinc-200 py-1">
                          {item.quantity}
                        </span>
                        <button className="p-1.5 px-2 hover:bg-zinc-50 transition-colors">
                          <Plus className="h-3 w-3 text-zinc-500" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="text-right text-sm font-bold text-zinc-900">
                      {numberFormatter.format(
                        parseFloat(item.variant.price) * item.quantity,
                      )}
                      <span className="ml-1 text-[10px] font-normal text-zinc-400">
                        {currencyCode}
                      </span>
                    </div>
                  </div>
                  <Separator className="opacity-50" />
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center text-sm text-zinc-400 border-b border-dashed">
              {t("cart.page.empty")}
            </div>
          )}
        </div>

        {/* Right: Summary Sidebar */}
        <div className="h-fit space-y-8">
          <div className="bg-zinc-50 p-6 shadow-sm border border-zinc-100">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 border-b pb-4 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">
                  {numberFormatter.format(subtotal ?? 0)}{" "}
                  {cart?.items?.[0]?.variant.currencyCode ?? ""}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="text-[15px] uppercase tracking-tight">
                  {fmt(ShipFee)}
                </span>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-lg font-bold text-zinc-900">
                <span>Total</span>
                <span>
                  {numberFormatter.format(subtotal ?? 0)}{" "}
                  {cart?.items?.[0]?.variant.currencyCode ?? ""}
                </span>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/${locale}/checkout`)}
              className="mt-8 w-full rounded-none bg-zinc-900 py-7 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:bg-zinc-800 transition-all active:scale-[0.98]"
              disabled={!cart?.items || cart?.items?.length === 0}
            >
              Checkout Now
            </Button>
          </div>

          <p className="text-[10px] text-center text-zinc-400 px-4 leading-relaxed">
            Shipping, taxes, and discounts will be calculated during the
            checkout process.
          </p>
        </div>
      </div>
    </div>
  );
}
