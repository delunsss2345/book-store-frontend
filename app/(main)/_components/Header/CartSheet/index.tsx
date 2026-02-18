"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectorCart } from "@/features/cart/selector/cart.selector";
import { useCartStore } from "@/features/cart/store/cart.store";
import useTranslator from "@/hooks/use-translator";
import { VariantItem } from "@/types/response/variant.response";
import { CartItem } from "@/types/response/cart.response";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const CartSheet = () => {
  const { t } = useTranslator();
  const cart = useCartStore(selectorCart);

  const updateItemQty = useCartStore((s: any) => s.updateItemQty);
  const removeItem = useCartStore((s: any) => s.removeItem);


  const subtotal = cart.items.reduce((sum: number, item: any) => {
    const price = item.price ?? item.product?.price ?? 0;
    const qty = item.qty ?? item.quantity ?? 1;
    return sum + price * qty;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-sm px-2 hover:bg-muted"
          aria-label={t("header.aria.cart")}
        >
          <span className="text-sm">{cart?.items?.length ?? 0}</span>
          <ShoppingBag className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-1/3 min-w-[420px] max-w-[720px] p-0"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-6 py-5 sm:px-8">
            <SheetTitle className="text-base font-semibold sm:text-sm">
              Your Shopping Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
            {cart && cart.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Cart is empty.</p>
            ) : (
              cart?.items?.map((item: CartItem, idx: number) => {
                const id = item.id ?? item.bookVariantId;

                const title =
                  item.variant.book.translations[0].title;
                const availability = item.variant.stock > 0 ? "In Stock" : "Out of Stock";

                const price = item.variant.price;
                const qty = item.quantity

                return (
                  <React.Fragment key={id}>
                    <div className="flex gap-3 sm:gap-4">
                      <div className="h-[106px] w-[70px] shrink-0 overflow-hidden rounded-sm border bg-muted/30">
                        <img src={item.variant.book.coverImage ?? ''} alt={title} className="h-full w-full object-cover" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-sm font-medium sm:text-base">
                            {title}
                          </p>
                          <p className="mt-1 text-base font-semibold sm:text-lg">
                            {currency.format(parseInt(price))}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-sm"
                            onClick={() =>
                              updateItemQty?.(id, Math.max(1, qty - 1))
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <div className="min-w-[52px] border px-3 py-1.5 text-center text-xs sm:text-sm">
                            {qty}
                          </div>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-sm"
                            onClick={() => updateItemQty?.(id, qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-xs sm:text-sm">
                          Availability: {availability}
                        </p>

                        <button
                          type="button"
                          className="text-left text-xs underline underline-offset-4 sm:text-sm"
                          onClick={() => removeItem?.(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {idx !== cart.items.length - 1 && <Separator className="my-5" />}
                  </React.Fragment>
                );
              })
            )}
          </div>

          <div className="border-t px-6 py-5 sm:px-8">
            <div className="mb-4 grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm sm:text-base">
              <p>Subtotal</p>
              <p className="justify-self-end text-xl font-semibold sm:text-2xl">
                {currency.format(subtotal)}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-10 rounded-sm px-6 text-sm sm:text-base"
            >
              <Link href="/cart">Go to Shopping Cart</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
