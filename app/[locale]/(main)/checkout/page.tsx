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
import { CheckoutPageSkeleton } from "./_components/CheckoutPageSekeleton";
import { OrderSummary } from "./_components/OrderSummany";

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
  }, [cart, isLoading, router, locale]);

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
