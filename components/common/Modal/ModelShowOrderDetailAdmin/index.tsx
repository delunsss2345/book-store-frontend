"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminOrderDetailsQuery, useAdminStore } from "@/features/admin";
import { AdminOrderItem } from "@/types/response/admin.response";
import { fmt } from "@/utils/format-number-vi";
import { ImageIcon, Package } from "lucide-react";
import LoadingState from "../../LoadingState";

export default function ModelShowOrderDetailAdmin() {
  const { selectOrderDetailId } = useAdminStore();

  const { data: items = [], isLoading } = useAdminOrderDetailsQuery(
    selectOrderDetailId as string,
  );

  const columns = useMemo<ColumnDef<AdminOrderItem>[]>(
    () => [
      {
        id: "product",
        header: "Sản phẩm",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-4 py-1">
              <div className="h-14 w-10 rounded border bg-muted flex-shrink-0 overflow-hidden relative shadow-sm">
                {item.coverImageUrlSnapshot ? (
                  <img
                    src={item.coverImageUrlSnapshot}
                    alt={item.titleSnapshot}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="m-auto size-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <span className="font-bold text-sm text-foreground leading-tight line-clamp-2">
                  {item.titleSnapshot || "Không có tiêu đề"}
                </span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 uppercase font-bold bg-slate-50"
                  >
                    {item.formatSnapshot}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground font-mono bg-slate-100 px-1 rounded">
                    {item.skuSnapshot}
                  </span>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "unitPrice",
        header: "Đơn giá",
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {fmt(Number(row.original.unitPrice))}
          </span>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
        cell: ({ row }) => (
          <div className="flex items-center justify-center w-fit px-2 py-1 bg-slate-100 rounded-md font-bold text-xs">
            x{row.original.quantity}
          </div>
        ),
      },
      {
        accessorKey: "lineTotal",
        header: () => <div className="text-right">Thành tiền</div>,
        cell: ({ row }) => (
          <div className="text-right font-bold text-blue-600">
            {fmt(Number(row.original.lineTotal))}
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="w-full space-y-4">
      {/* Title đơn giản */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Package className="size-5 text-blue-600" />
        <h3 className="font-bold text-lg">Danh sách sản phẩm</h3>
        <span className="ml-auto text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {items.length} mặt hàng
        </span>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[11px] font-bold uppercase tracking-wider py-4"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50/30 transition-colors border-b last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground italic"
                >
                  Không tìm thấy dữ liệu sản phẩm.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end pr-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Tổng cộng vật phẩm:
          </span>
          <span className="text-xl font-black text-blue-600">
            {fmt(items.reduce((acc, cur) => acc + Number(cur.lineTotal), 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
