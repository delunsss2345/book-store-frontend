import { Skeleton } from "@/src/components/ui/skeleton";
import { TableCell, TableRow } from "@/src/components/ui/table";

type ProductsTableSkeletonProps = {
  rows?: number;
};

export default function ProductsTableSkeleton({
  rows = 6,
}: ProductsTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={`products-skeleton-${index}`}
          className="hover:bg-transparent"
        >
          <TableCell className="py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-9 rounded border" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-20" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24 rounded-full" />
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
