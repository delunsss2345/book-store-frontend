import { Skeleton } from "@/src/components/ui/skeleton";

export function CheckoutPageSkeleton() {
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
