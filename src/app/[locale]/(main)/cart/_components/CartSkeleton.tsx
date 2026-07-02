import { Skeleton } from "@/src/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="bg-paper min-h-screen">
      <div className="px-6 py-10 lg:px-10 max-w-7xl mx-auto space-y-10">
        <Skeleton className="h-8 w-48" />
        {[1, 2].map((g) => (
          <div key={g} className="space-y-4">
            <Skeleton className="h-5 w-40" />
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-5 border-b border-line"
              >
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-[100px] w-[70px] rounded-sm shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
