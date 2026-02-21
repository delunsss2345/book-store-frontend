"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartQuery } from "@/features/cart/hooks";

import CheckoutUser from "./_components/CheckoutUser";

const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " đ";

type OrderSummaryProps = {
  cart: NonNullable<ReturnType<typeof useCartQuery>["data"]>;
  subtotal: number;
};

function OrderSummary({ cart, subtotal }: OrderSummaryProps) {
  return (
    <aside className="relative">
      <div className="sticky top-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-lg font-bold">Tóm tắt đơn hàng</h3>

        {/* Product list */}
        <div className="custom-scrollbar -mr-2 max-h-[400px] space-y-4 overflow-y-auto pr-2">
          {cart.items.map((item) => {
            const title =
              item.variant.book.translations[0]?.title ?? "Sản phẩm";
            const imageUrl = item.variant.book.coverImageUrl ?? "";
            const price = parseFloat(item.variant.price);

            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-zinc-100 bg-zinc-50">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  ) : null}

                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold text-white shadow-sm">
                    {item.quantity}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">
                    {title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">
                    {item.variant.format}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold">
                    {fmt(price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="my-6 opacity-60" />

        {/* Discount code */}
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            className="h-11 flex-1 rounded-lg border-zinc-200 bg-zinc-50/50 text-sm focus:bg-white"
          />
          <Button
            variant="secondary"
            className="h-11 rounded-lg bg-zinc-100 px-4 text-sm font-semibold transition-colors hover:bg-zinc-200"
          >
            Áp dụng
          </Button>
        </div>

        <Separator className="my-6 opacity-60" />

        {/* Totals */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">
              Tạm tính ({cart.items.length} sản phẩm)
            </span>
            <span className="font-medium">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-zinc-500">
              Phí vận chuyển
              <Info className="h-3.5 w-3.5 text-zinc-300" />
            </span>
            <span className="font-medium text-zinc-900">Miễn phí</span>
          </div>

          <div className="mt-2 border-t border-zinc-100 pt-4">
            <div className="flex items-end justify-between">
              <span className="text-base font-bold">Tổng cộng</span>

              <div className="text-right">
                <p className="mb-1 text-[10px] font-medium text-zinc-400">
                  Đã bao gồm VAT
                </p>
                <p className="text-2xl font-black leading-none text-zinc-900">
                  {fmt(subtotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading } = useCartQuery();

  const subtotal =
    cart?.items.reduce((sum, item) => {
      return sum + parseFloat(item.variant.price) * item.quantity;
    }, 0) ?? 0;

  useEffect(() => {
    if (!isLoading && !cart) router.push("/cart");
  }, [cart, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!cart) return null;

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="container-main mx-auto w-full px-4 py-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_450px]">
          <CheckoutUser />
          <OrderSummary cart={cart} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
