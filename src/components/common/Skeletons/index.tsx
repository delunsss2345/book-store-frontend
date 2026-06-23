import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Common Skeletons
 * Tái sử dụng các skeleton components để tránh lặp lại code trong nhiều nơi.
 */

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border p-4 shadow-sm",
        className,
      )}
    >
      <Skeleton className="h-40 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="mt-auto h-10 w-full" />
    </div>
  );
}

export function ListSkeleton({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full overflow-hidden rounded-md border", className)}>
      <div className="border-b bg-muted/50 p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`th-${i}`} className="h-5 flex-1" />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={`tr-${rowIdx}`}
            className="flex gap-4 border-b p-4 last:border-0"
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={`td-${rowIdx}-${colIdx}`} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function BookCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Skeleton className="aspect-[3/4] w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 self-center" />
      <Skeleton className="h-4 w-1/2 self-center" />
    </div>
  );
}

export function BookDetailSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-surface animate-pulse", className)}>
      <div className="px-6 py-6 lg:px-10">
        <Skeleton className="h-4 w-1/3 mb-6" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Skeleton className="aspect-[3/4] w-full rounded-md" />
            <div className="mt-4 flex gap-4">
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7 lg:pl-6 space-y-6">
            <div className="border-b border-line pb-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-full sm:w-32" />
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>

            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
