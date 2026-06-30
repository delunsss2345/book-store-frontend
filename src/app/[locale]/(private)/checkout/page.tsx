"use client";

import CheckoutUser from "./_components/CheckoutUser";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { CheckoutGuest } from "./_components/CheckoutGuest";
import { OrderSummary } from "./_components/OrderSummany";
import { useOrderStore } from "@/features/orders/store/order.store";
import { useCartQuery } from "@/features/cart/hooks";
import { CheckoutPageSkeleton } from "./_components/CheckoutPageSekeleton";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const buyNow = useOrderStore((state) => state.buyNow);
  const router = useRouter();
  const { data: dbCart, isPending } = useCartQuery();

  const cart = useMemo(() => {
    if (buyNow) {
      return {
        items: [
          {
            id: "buy_now_item",
            quantity: buyNow.quantity,
            variant: {
              ...buyNow.variant,
              book: buyNow.book,
            },
          },
        ],
      } as unknown as NonNullable<ReturnType<typeof useCartQuery>["data"]>;
    }
    return dbCart;
  }, [buyNow, dbCart]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum: number, item) => {
      return sum + parseFloat(item.variant.price) * item.quantity;
    }, 0);
  }, [cart]);

  const isLoading = isPending && !buyNow;

  useEffect(() => {
    if (!isLoading && (!cart || !cart?.items?.length)) {
      router.push("/orders");
    }
  }, [cart, isLoading, router]);

  if (isLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (!cart || !cart?.items?.length) {
    return null;
  }

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
