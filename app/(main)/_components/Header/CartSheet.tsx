"use client";

import Link from "next/link";
import * as React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useTranslator from "@/hooks/use-translator";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PreviewBookCard = () => {
  return (
    <article className="mx-auto mt-6 w-full max-w-[340px] text-center">
      <div className="mx-auto h-[420px] w-[260px] overflow-hidden border bg-[#d6c187] shadow-md">
        <div className="flex h-full flex-col justify-between p-4">
          <p className="text-left text-xs tracking-[0.2em] text-black/70">ALEJANDRO</p>
          <p className="text-center text-5xl font-semibold leading-[0.9] text-black">
            ART
            <br />
            SIN
            <br />
            FIN
          </p>
          <div className="bg-black/80 p-3 text-center text-sm font-medium text-[#d8bf7a]">
            ALEJANDRO
            <br />
            ART SIN FIN
            <br />
            JODOROWSKY
          </div>
        </div>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-wide">NEW</p>
      <p className="mt-2 text-5xl font-semibold leading-tight">Alejandro Jodorowsky.</p>
      <p className="text-5xl leading-tight">Art Sin Fin</p>
      <p className="mt-5 text-4xl font-semibold">{currency.format(1500)}</p>
    </article>
  );
};

const CartSheet = () => {
  const { t } = useTranslator();
  const [qty, setQty] = React.useState(1);

  const price = 1000;
  const subtotal = price * qty;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-sm px-2 hover:bg-muted"
          aria-label={t("header.aria.cart")}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm">1</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-[92vw] p-0 sm:max-w-[640px] lg:max-w-[720px]"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-6 py-5 sm:px-8">
            <SheetTitle className="text-xl font-semibold sm:text-2xl">
              Your Shopping Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
            <div className="flex gap-4 sm:gap-6">
              <div className="h-36 w-24 shrink-0 rounded-sm border bg-muted/30" />

              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xl font-medium sm:text-2xl">Sophia by Eisenstaedt</p>
                  <p className="mt-1 text-2xl font-semibold sm:text-3xl">
                    {currency.format(price)}
                  </p>
                </div>

                <p className="text-base sm:text-lg">Edition: English</p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-sm"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <div className="min-w-[64px] border px-4 py-2 text-center text-sm">
                    {qty}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-sm"
                    onClick={() => setQty((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-base">Availability: In Stock</p>

                <button
                  type="button"
                  className="text-left text-base underline underline-offset-4"
                >
                  Remove
                </button>
              </div>
            </div>

            <Separator className="my-6" />
            <PreviewBookCard />
          </div>

          <div className="border-t px-6 py-5 sm:px-8">
            <div className="mb-4 grid grid-cols-[1fr_auto_auto] items-center gap-3 text-base sm:text-lg">
              <p>Subtotal</p>
              <p>1 Item</p>
              <p className="justify-self-end text-2xl font-semibold sm:text-3xl">
                {currency.format(subtotal)}
              </p>
            </div>

            <Button asChild variant="outline" className="h-11 rounded-sm px-6 text-base">
              <Link href="/cart">Go to Shopping Cart</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
