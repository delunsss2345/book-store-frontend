import { Skeleton } from "@/src/components/ui/skeleton";
import { TableCell, TableRow } from "@/src/components/ui/table";

const RolesTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {/* ID */}
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          {/* Code */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          {/* Name */}
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          {/* Description */}
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          {/* Status */}
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          {/* Actions */}
          <TableCell>
            <Skeleton className="h-8 w-8 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default RolesTableSkeleton;
