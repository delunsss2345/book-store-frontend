import { Skeleton } from "@/src/components/ui/skeleton";
import { TableCell, TableRow } from "@/src/components/ui/table";

type GoodsReceiptSkeletonProps = {
  rows?: number;
};

export default function GoodsReceiptSkeleton({
  rows = 6,
}: GoodsReceiptSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={`goods-receipt-skeleton-${index}`}
          className="hover:bg-transparent"
        >
          {/* Mã phiếu */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-28" />
          </TableCell>

          {/* Nhà cung cấp */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-36" />
          </TableCell>

          {/* Ngày tạo */}
          <TableCell className="py-3">
            <Skeleton className="h-4 w-28" />
          </TableCell>

          {/* Trạng thái */}
          <TableCell className="py-3">
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>

          {/* Trạng thái xử lý */}
          <TableCell className="py-3">
            <Skeleton className="h-6 w-28 rounded-full" />
          </TableCell>

          {/* Tổng tiền */}
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
