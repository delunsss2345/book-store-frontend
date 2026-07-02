"use client";

import CheckoutUser from "./_components/CheckoutUser";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { CheckoutGuest } from "./_components/CheckoutGuest";
import { OrderSummary } from "./_components/OrderSummany";
import { useOrderStore } from "@/features/orders/store/order.store";
import { CheckoutPageSkeleton } from "./_components/CheckoutPageSekeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const buyNow = useOrderStore((s) => s.buyNow);
  const items = useOrderStore((s) => s.items);

  // Redirect if nothing to checkout
  useEffect(() => {
    if (!buyNow && items.length === 0) {
      router.push("/orders");
    }
  }, [buyNow, items, router]);

  if (!buyNow && items.length === 0) {
    return <CheckoutPageSkeleton />;
  }

  return (
    <section className="bg-paper min-h-screen pb-20">
      <div className="mx-auto max-w-[1540px] px-5 pt-10">
        <div className="bg-paper px-6 py-10 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
            {user ? <CheckoutUser /> : <CheckoutGuest />}
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
