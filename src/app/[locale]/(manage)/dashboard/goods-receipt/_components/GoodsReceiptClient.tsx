"use client";

import { useGetGoodsReceiptsQuery } from "@/features/goods-receipt/hooks/goods-receipt.query";
import { ModalType, useModalStore } from "@/features/modal";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type { GoodsReceiptItem } from "@/types/response/goods-receipt.response";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Package,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo } from "react";
import GoodsReceiptSkeleton from "./GoodsReceiptSkeleton";

function formatCurrency(value: number | string) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numValue || 0);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function GoodsReceiptClient() {
  const { data: goodsReceipts, isPending } = useGetGoodsReceiptsQuery();
  const { setGoodsReceiptId, onOpen } = useModalStore();

  const columns = useMemo<ColumnDef<GoodsReceiptItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => "Mã phiếu",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold text-foreground">
            {row.original.id.slice(0, 8)}...
          </span>
        ),
      },
      {
        id: "supplierName",
        header: () => "Nhà cung cấp",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Package className="size-3.5 text-muted-foreground" />
            </div>
            <span className="font-medium text-foreground">
              {row.original.supplier?.name || "N/A"}
            </span>
          </div>
        ),
      },
      {
        id: "creatorName",
        header: () => "Người tạo",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/30">
              <UserRound className="size-3.5 text-indigo-500" />
            </div>
            <span className="text-sm text-foreground">
              {row.original.creator?.name || "N/A"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: () => "Ngày tạo",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
      {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">Tổng tiền</div>,
        cell: ({ row }) => (
          <div className="text-right font-semibold tabular-nums text-foreground">
            {formatCurrency(row.original.totalAmount)}
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right">Thao tác</div>,
        cell: ({ row }) => {
          const record = row.original;

          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setGoodsReceiptId(record.id);
                      onOpen(ModalType.DETAIL_GOODS_RECEIPT);
                    }}
                  >
                    Xem chi tiết
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [onOpen, setGoodsReceiptId],
  );

  const table = useReactTable({
    data: goodsReceipts?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Phiếu nhập kho
          </h1>
          <p className="text-sm text-muted-foreground">
            Xem danh sách phiếu nhập kho từ nhà cung cấp.
          </p>
        </div>
      </div>

      {/* Table Card */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">
              Danh sách phiếu nhập
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã hoặc nhà cung cấp..."
                  className="pl-9 w-full md:w-[300px] bg-background h-9 shadow-none"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="size-4" /> Lọc
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-slate-900 dark:text-slate-100 font-bold h-11"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPending ? (
                <GoodsReceiptSkeleton />
              ) : table && table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
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
                    className="h-32 text-center text-muted-foreground"
                  >
                    Không có phiếu nhập kho nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 dark:bg-slate-900/20 px-6 py-4 md:flex-row text-sm text-muted-foreground">
          <p>
            Hiển thị {goodsReceipts?.items?.length ?? 0} /{" "}
            {goodsReceipts?.total ?? 0} phiếu nhập kho
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="default"
                className="h-8 w-8 p-0 bg-slate-950 dark:bg-slate-50 dark:text-slate-900 shadow-sm"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
