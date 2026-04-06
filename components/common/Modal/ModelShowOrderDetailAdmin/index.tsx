"use client";

import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/features/admin";
import { Package, User, CreditCard, Info, Loader2 } from "lucide-react";
import { fmt } from "@/utils/format-number-vi";
import { AdminOrderItem } from "@/types/response/admin.response";
import { Separator } from "@/components/ui/separator";
import { useQueryOrderItems } from "@/features/orders";

export default function ModelShowOrderDetailAdmin() {
  const { selectOrderDetailId, orders } = useAdminStore();

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectOrderDetailId),
    [orders, selectOrderDetailId],
  );

  // NOTE: Cái này là của order service không phải của admin nên sửa vào lần sau
  const { data: items, isLoading } = useQueryOrderItems(
    selectOrderDetailId as string,
  );

  const columns = useMemo<ColumnDef<AdminOrderItem>[]>(
    () => [
      {
        accessorKey: "product",
        header: "Sản phẩm",
        cell: ({ row }) => (
          <div className="flex flex-col py-1">
            <span className="font-bold text-foreground line-clamp-1">
              {row.original.titleSnapshot || "N/A"}
            </span>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono uppercase">
                {row.original.formatSnapshot}
              </span>
              <span className="text-xs text-muted-foreground italic">
                SKU: {row.original.skuSnapshot}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "unitPrice",
        header: "Đơn giá",
        cell: ({ row }) => (
          <span className="text-sm">{fmt(Number(row.original.unitPrice))}</span>
        ),
      },
      {
        accessorKey: "quantity",
        header: "SL",
        cell: ({ row }) => (
          <span className="font-semibold italic">x{row.original.quantity}</span>
        ),
      },
      {
        accessorKey: "lineTotal",
        header: "Thành tiền",
        cell: ({ row }) => (
          <span className="text-sm font-bold text-blue-600">
            {fmt(Number(row.original.lineTotal))}
          </span>
        ),
      },
    ],
    [],
  );

  // Fallback data là mảng rỗng để tránh crash table khi đang loading
  const table = useReactTable({
    data: items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 3. Xử lý các trạng thái Loading / Not Found
  if (isLoading) return <LoadingState />;
  if (!selectedOrder)
    return <EmptyState message="Không tìm thấy thông tin đơn hàng." />;
  if (!items || items.length === 0)
    return <EmptyState message="Đơn hàng này không có sản phẩm nào." />;

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-1">
            <Package className="size-4" />
            <span>Chi tiết đơn hàng</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">
            #{selectedOrder.orderCode}
          </h2>
          <p className="text-sm text-muted-foreground">
            Ngày đặt:{" "}
            {new Date(selectedOrder?.createdAt ?? "").toLocaleString("vi-VN")}
          </p>
        </div>
        <Badge
          variant={
            selectedOrder.status === "PENDING_PAYMENT" ? "outline" : "default"
          }
          className="h-fit px-3 py-1 uppercase tracking-wider"
        >
          {selectedOrder.status}
        </Badge>
      </div>

      {/* Thông tin khách hàng & Thanh toán */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <User className="size-4 text-muted-foreground" />
            <span>Thông tin khách hàng</span>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium text-base">
              {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
            </p>
            <p className="text-muted-foreground">
              {selectedOrder.user?.email || selectedOrder.guestEmail || "-"}
            </p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <CreditCard className="size-4 text-muted-foreground" />
            <span>Trạng thái thanh toán</span>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className="w-fit bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              {selectedOrder.paymentStatus}
            </Badge>
            <span className="text-xs text-muted-foreground italic">
              Loại tiền tệ: {selectedOrder.currencyCode}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Danh sách sản phẩm ({items.length})
        </h3>
        <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs font-bold uppercase"
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
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="ml-auto w-full max-w-md space-y-3 pt-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tạm tính:</span>
          <span>{fmt(Number(selectedOrder.subtotal))}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Phí vận chuyển:</span>
          <span>{fmt(Number(selectedOrder.shippingFee))}</span>
        </div>
        <div className="flex justify-between text-sm text-red-500">
          <span>Giảm giá:</span>
          <span>-{fmt(Number(selectedOrder.discountAmount))}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center pt-2">
          <span className="text-base font-bold">Tổng cộng:</span>
          <span className="text-2xl font-black text-blue-600">
            {fmt(Number(selectedOrder.totalAmount))}
          </span>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <Loader2 className="size-8 text-blue-600 animate-spin mb-4" />
      <p className="text-muted-foreground animate-pulse">
        Đang tải danh sách sản phẩm...
      </p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8">
      <Info className="size-8 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
