"use client";

import {
  useCartQuery,
  useRemoveItemMutation,
  useUpdateQtyMutation,
} from "@/features/cart/hooks";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { CartItem } from "@/types/response/cart.response";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import * as React from "react";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const CartSheet = () => {
  const local = useLocale();
  const { t } = useTranslator();
  const { data: cart } = useCartQuery();
  const updateQtyMutation = useUpdateQtyMutation();
  const removeItemMutation = useRemoveItemMutation();
  const items = cart?.items ?? [];

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3 text-white transition hover:bg-ink/90"
          aria-label={t("header.aria.cart")}
        >
          <ShoppingBag className="h-[17px] w-[17px]" />
          <span className="text-[12px] font-semibold">{cart?.items?.length ?? 0}</span>
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
            {items?.length === 0 ? (
              <p className="text-sm text-muted-foreground">Cart is empty.</p>
            ) : (
              items.map((item: CartItem, idx: number) => {
                const id = item.id ?? item.bookVariantId;

                const title = item.variant.book.translations[0].title;
                const availability =
                  (item.variant.stock ?? 0) > 0 ? "In Stock" : "Out of Stock";

                const price = item.variant.price;
                const qty = item.quantity;

                return (
                  <React.Fragment key={id}>
                    <div className="flex gap-3 sm:gap-4">
                      <div className="h-[106px] w-[70px] shrink-0 overflow-hidden rounded-sm border bg-muted/30">
                        <img
                          src={item.variant.book.coverImageUrl ?? ""}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
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
                              updateQtyMutation.mutate({
                                id: String(id),
                                delta: -1,
                              })
                            }
                            disabled={updateQtyMutation.isPending}
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
                            onClick={() =>
                              updateQtyMutation.mutate({
                                id: String(id),
                                delta: 1,
                              })
                            }
                            disabled={updateQtyMutation.isPending}
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
                          className="text-left text-xs underline underline-offset-4 sm:text-sm cursor-pointer"
                          onClick={() => removeItemMutation.mutate(String(id))}
                          disabled={removeItemMutation.isPending}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {idx !== items.length - 1 && <Separator className="my-5" />}
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

            <SheetClose asChild>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-sm px-6 text-sm sm:text-base"
              >
                <Link href={`/${local}/cart`}>Go to Shopping Cart</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
