import { Skeleton } from "@/src/components/ui/skeleton";
import { TableCell, TableRow } from "@/src/components/ui/table";

type PurchaseOrderSkeletonProps = {
  rows?: number;
};

export default function PurchaseOrderSkeleton({
  rows = 6,
}: PurchaseOrderSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={`purchase-order-skeleton-${index}`}
          className="hover:bg-transparent"
        >
          {/* Mã code */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-28" />
          </TableCell>

          {/* Tên nhà cung cấp */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-36" />
          </TableCell>

          {/* Ngày tạo */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-28" />
          </TableCell>

          {/* Status */}
          <TableCell className="py-3">
            <Skeleton className="h-5 w-24 rounded-full" />
          </TableCell>

          {/* Tổng giá */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Action */}
          <TableCell className="py-3">
            <div className="flex items-center justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
