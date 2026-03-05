"use client";

import { Skeleton } from "@/components/ui/skeleton";

type OrdersSkeletonProps = {
  count?: number;
};

export function OrdersSkeleton({ count = 3 }: OrdersSkeletonProps) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-neutral-100 px-6 py-4">
            <div className="flex flex-wrap gap-6">
              <Skeleton className="h-3 w-32 rounded-sm" />
              <Skeleton className="h-3 w-24 rounded-sm" />
              <Skeleton className="h-3 w-20 rounded-sm" />
            </div>
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded-sm" />
                <Skeleton className="h-3 w-48 rounded-sm" />
              </div>
            </div>
            <Skeleton className="h-9 w-20 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-neutral-500">
            {["Subtotal", "Shipping", "Discount"].map((label) => (
              <div key={label}>
                <Skeleton className="h-3 w-16 rounded-sm" />
                <Skeleton className="mt-2 h-4 w-24 rounded-sm" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-3 text-sm">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
