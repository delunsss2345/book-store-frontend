"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OrderStatus } from "@/constants/enums/order";
import { OrderCard } from "./_components/OrderCard";
import { OrdersSkeleton } from "./_components/OrdersSkeleton";
import { useQueryOrder } from "@/features/orders/hooks/use-query-orders";

type TabValue = "all" | "in-progress" | "delivered" | "returns";

const tabs: { label: string; value: TabValue }[] = [
  { label: "All Orders", value: "all" },
  { label: "In Progress", value: "in-progress" },
  { label: "Delivered", value: "delivered" },
  { label: "Returns", value: "returns" },
];

const STATUS_FILTERS: Record<TabValue, OrderStatus[] | null> = {
  all: null,
  "in-progress": [
    OrderStatus.PENDING_PAYMENT,
    OrderStatus.PAID,
    OrderStatus.CONFIRMED,
    OrderStatus.PACKING,
    OrderStatus.SHIPPING,
  ],
  delivered: [OrderStatus.DELIVERED],
  returns: [
    OrderStatus.RETURN_REQUESTED,
    OrderStatus.RETURNED,
    OrderStatus.REFUNDED,
    OrderStatus.CANCELLED,
  ],
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchValue, setSearchValue] = useState("");
  const { data: orders, isLoading, isFetching, error } = useQueryOrder();
  const isOrdersLoading = isLoading || isFetching;
  const searchTerm = searchValue.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    if (!orders?.length) {
      return [];
    }

    const statusFilter = STATUS_FILTERS[activeTab];
    const baseOrders = statusFilter
      ? orders.filter(
          (order) => order.status && statusFilter.includes(order.status),
        )
      : orders;

    if (!searchTerm) {
      return baseOrders;
    }

    return baseOrders.filter((order) =>
      order.orderCode.toLowerCase().includes(searchTerm),
    );
  }, [activeTab, orders, searchTerm]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white">
      <div className="container-main py-10">
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Quickly review your purchases and track the shipping status.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === tab.value
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search orders..."
              className="h-9 w-56 rounded-lg border-neutral-200 pl-9 text-sm"
            />
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load orders at the moment. Please try again later.
          </div>
        ) : null}

        <div className="mt-8 space-y-8">
          {isOrdersLoading ? (
            <OrdersSkeleton count={2} />
          ) : filteredOrders.length ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-200 px-6 py-12 text-center text-sm text-neutral-500">
              No orders match your filters yet. Check back after you place one!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
