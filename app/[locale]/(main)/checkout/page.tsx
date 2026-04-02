"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartQuery } from "@/features/cart/hooks";

import CheckoutUser from "./_components/CheckoutUser";
import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth";
import { CheckoutGuest } from "./_components/CheckoutGuest";
import { ShipFee } from "@/constants/enums/order";
import { fmt } from "@/utils/format-number-vi";

type OrderSummaryProps = {
  cart: NonNullable<ReturnType<typeof useCartQuery>["data"]>;
  subtotal: number;
};

function OrderSummary({ cart, subtotal }: OrderSummaryProps) {
  const t = useTranslations();

  const total = subtotal + ShipFee;

  return (
    <aside className="relative">
      <div className="sticky top-10 w-full max-w-md rounded-3xl border border-zinc-100 bg-white p-8 shadow-xl shadow-zinc-200/50">
        {/* Tiêu đề */}
        <h3 className="mb-8 text-xl font-extrabold tracking-tight text-zinc-900">
          {t("checkout.orderSummary.title")}
        </h3>

        {/* Danh sách sản phẩm - Tối ưu cuộn */}
        <div className="custom-scrollbar -mr-2 max-h-[380px] space-y-6 overflow-y-auto pr-2">
          {cart.items.map((item) => {
            const title =
              item.variant.book.translations[0]?.title ??
              t("checkout.orderSummary.productFallback");
            const price = parseFloat(item.variant.price);

            return (
              <div key={item.id} className="flex gap-4">
                {/* Thumbnail với Badge số lượng */}
                <div className="relative h-24 w-20 shrink-0 rounded-xl border border-zinc-100 bg-zinc-50 shadow-sm overflow-visible">
                  {item.variant.book.coverImageUrl && (
                    <Image
                      src={item.variant.book.coverImageUrl}
                      alt={title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  )}
                  <span className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white ring-2 ring-white">
                    {item.quantity}
                  </span>
                </div>

                {/* Thông tin sách */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[15px] font-bold leading-snug text-zinc-800">
                      {title}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-zinc-400">
                      {item.variant.format}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-zinc-900">
                    {fmt(price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        {/* Mã giảm giá - Tinh chỉnh UI Input */}
        <div className="flex gap-3">
          <Input
            placeholder={t("checkout.orderSummary.discountPlaceholder")}
            className="h-12 flex-1 rounded-xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-zinc-100"
          />
          <Button
            variant="secondary"
            className="h-12 rounded-xl bg-zinc-100 px-6 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-200 active:scale-95"
          >
            {t("checkout.orderSummary.apply")}
          </Button>
        </div>

        <div className="my-8 h-px bg-zinc-100" />

        {/* Phần thanh toán */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-medium">
              {t("checkout.orderSummary.subtotalWithCount", {
                count: cart.items.length,
              })}
            </span>
            <span className="font-semibold text-zinc-900">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-zinc-500 font-medium">
              {t("checkout.orderSummary.shippingFee")}
              <Info className="h-4 w-4 text-zinc-300 cursor-help" />
            </span>
            <span className="font-bold text-emerald-600">
              {!ShipFee
                ? t("checkout.orderSummary.freeShipping")
                : fmt(ShipFee)}
            </span>
          </div>

          {/* Tổng cộng - Điểm nhấn chính */}
          <div className="mt-6 border-t border-zinc-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-zinc-900">
                {t("checkout.orderSummary.total")}
              </span>

              <div className="text-right">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {t("checkout.orderSummary.vatIncluded")}
                </p>
                <p className="text-3xl font-black tracking-tighter text-zinc-900">
                  {fmt(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
function CheckoutPageSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="container-main mx-auto w-full px-4 py-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_450px]">
          <div className="space-y-8">
            <Skeleton className="h-10 w-64" />
            <div className="space-y-4 rounded-2xl border bg-white p-6">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="space-y-4 rounded-2xl border bg-white p-6">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border bg-white p-8">
            <Skeleton className="h-6 w-48" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-20 w-16 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const locale = useLocale();
  const { data: cart, isLoading } = useCartQuery();
  const user = useAuthStore(selectorCurrentUser);
  const subtotal =
    cart?.items.reduce((sum, item) => {
      return sum + parseFloat(item.variant.price) * item.quantity;
    }, 0) ?? 0;

  useEffect(() => {
    if (!isLoading && (!cart || cart?.items.length === 0)) {
      router.push(`/${locale}/cart`);
    }
  }, [cart, isLoading, router]);

  if (isLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (!cart) return null;

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="container-main mx-auto w-full px-4 py-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_450px]">
          {user ? <CheckoutUser /> : <CheckoutGuest />}
          <OrderSummary cart={cart} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
