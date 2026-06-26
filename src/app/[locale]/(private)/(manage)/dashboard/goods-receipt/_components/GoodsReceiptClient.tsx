"use client";

import {
  useGetPurchaseOrdersQuery,
  useTransferProcessingPurchaseOrderMutation,
} from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { ModalType, useModalStore } from "@/features/modal";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
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
import { PurchaseOrderStatus } from "@/types/request/purchase-order.request";
import type { PurchaseOrderItem } from "@/types/response/purchase-order.response";
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
} from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
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

function getStatusBadgeClass(status?: string | null) {
  switch (status) {
    case "APPROVED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300";
    case "PROCESSING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300";
    case "RECEIVED":
    case "COMPLETED":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300";
    case "CANCELLED":
    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300";
  }
}

export function GoodsReceiptClient() {
  const { data: purchaseOrders, isPending } = useGetPurchaseOrdersQuery({
    status: PurchaseOrderStatus.APPROVED,
  });
  const setPurchaseOrderId = useModalStore((state) => state.setPurchaseOrderId);
  const onOpen = useModalStore((state) => state.onOpen);
  const { mutateAsync: transferProcessing, isPending: isTransferProcessing } =
    useTransferProcessingPurchaseOrderMutation();

  const columns = useMemo<ColumnDef<PurchaseOrderItem>[]>(
    () => [
      {
        accessorKey: "code",
        header: () => "Mã đơn",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold text-foreground">
            {row.original.code}
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
        accessorKey: "createdAt",
        header: () => "Ngày tạo",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: () => "Trạng thái",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={`font-medium ${getStatusBadgeClass(row.original.status)}`}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "statusTransfer",
        header: () => "Trạng thái xử lý",
        cell: ({ row }) => {
          const statusTransfer = row.original.statusTransfer || "Chưa chuyển";

          return (
            <Badge
              variant="outline"
              className={`font-medium ${getStatusBadgeClass(row.original.statusTransfer)}`}
            >
              {statusTransfer}
            </Badge>
          );
        },
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
                      setPurchaseOrderId(record.id);
                      onOpen(ModalType.DETAIL_STOCK_IMPORT);
                    }}
                  >
                    Xem chi tiết
                  </DropdownMenuItem>
                  {record.statusTransfer === "PROCESSING" ? (
                    <DropdownMenuItem
                      onClick={() => {
                        setPurchaseOrderId(record.id);
                        onOpen(ModalType.CREATE_STOCK_IMPORT);
                      }}
                    >
                      Kiểm tra đơn hàng
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      disabled={isTransferProcessing}
                      onClick={() =>
                        toast.promise(transferProcessing(record.id), {
                          loading: "Đang chuyển đơn sang xử lý...",
                          success: "Đơn đã chuyển sang xử lý",
                          error: "Chuyển trạng thái xử lý thất bại",
                        })
                      }
                    >
                      Chuyển xử lý
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [isTransferProcessing, onOpen, setPurchaseOrderId, transferProcessing],
  );

  const table = useReactTable({
    data: purchaseOrders?.items || [],
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
            Xem danh sách đơn nhập hàng đã được duyệt.
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
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
          </div>
        </CardContent>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 dark:bg-slate-900/20 px-6 py-4 md:flex-row text-sm text-muted-foreground">
          <p>
            Hiển thị {purchaseOrders?.items?.length ?? 0} /{" "}
            {purchaseOrders?.total ?? 0} đơn đã duyệt
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
