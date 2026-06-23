"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Info } from "lucide-react";

import { useCartQuery } from "@/features/cart/hooks";

import CheckoutUser from "./_components/CheckoutUser";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { CheckoutGuest } from "./_components/CheckoutGuest";
import { CheckoutPageSkeleton } from "./_components/CheckoutPageSekeleton";
import { OrderSummary } from "./_components/OrderSummany";

export default function CheckoutPage() {
  const router = useRouter();
  const locale = useLocale();
  const { data: cart, isLoading } = useCartQuery();
  const { user } = useAuth();
  const subtotal =
    cart?.items.reduce((sum, item) => {
      return sum + parseFloat(item.variant.price) * item.quantity;
    }, 0) ?? 0;

  useEffect(() => {
    if (!isLoading && (!cart || cart?.items.length === 0)) {
      router.push(`/${locale}/cart`);
    }
  }, [cart, isLoading, router, locale]);

  if (isLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (!cart) return null;

  return (
    <section className="bg-paper min-h-screen pb-20">
      <div className="mx-auto max-w-[1540px] px-5 pt-10">
        <div className="bg-paper px-6 py-10 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
            {user ? <CheckoutUser /> : <CheckoutGuest />}
            <OrderSummary cart={cart} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </section>
  );
}
