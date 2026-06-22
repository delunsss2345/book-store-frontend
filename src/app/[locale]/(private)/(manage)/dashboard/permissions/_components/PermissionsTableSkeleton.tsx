import { Skeleton } from "@/src/components/ui/skeleton";
import { TableCell, TableRow } from "@/src/components/ui/table";

const PermissionsTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {/* Code */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          {/* Method */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>
          {/* Path Pattern */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-4 w-48" />
          </TableCell>
          {/* Description */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          {/* Status */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          {/* Actions */}
          <TableCell className="px-4 py-4">
            <Skeleton className="h-8 w-8 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default PermissionsTableSkeleton;
