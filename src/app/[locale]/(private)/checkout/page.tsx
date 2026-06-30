"use client";

import CheckoutUser from "./_components/CheckoutUser";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { CheckoutGuest } from "./_components/CheckoutGuest";
import { OrderSummary } from "./_components/OrderSummany";
import { useOrderStore } from "@/features/orders/store/order.store";
import { useMemo } from "react";
import { notFound, useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const buyNow = useOrderStore((state) => state.buyNow);
  const router = useRouter();

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
      } as any;
    }
    return [];
  }, [buyNow]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum: number, item: any) => {
      return sum + parseFloat(item.variant.price) * item.quantity;
    }, 0);
  }, [cart]);

  if (!cart || !cart?.items?.length) return router.push("/orders");

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
