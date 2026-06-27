"use client";

import { ModalType, useModalStore } from "@/features/modal";
import {
  useGetPurchaseOrdersQuery,
  useTransferProcessingPurchaseOrderMutation,
} from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
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

function formatNullableCurrency(value?: number | string | null) {
  if (value === null || value === undefined || value === "") {
    return "Đang tính toán";
  }

  return formatCurrency(value);
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

type StatusBadgeConfig = {
  label: string;
  className: string;
  dotClassName: string;
};

const defaultStatusConfig: StatusBadgeConfig = {
  label: "Chưa chuyển",
  className:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300",
  dotClassName: "bg-slate-400",
};

const purchaseOrderStatusConfig: Record<string, StatusBadgeConfig> = {
  APPROVED: {
    label: "Đã duyệt",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300",
    dotClassName: "bg-emerald-500",
  },
  RECEIVED: {
    label: "Đã nhận",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300",
    dotClassName: "bg-blue-500",
  },
  CANCELLED: {
    label: "Đã hủy",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300",
    dotClassName: "bg-red-500",
  },
  REJECTED: {
    label: "Từ chối",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300",
    dotClassName: "bg-red-500",
  },
};

const processingStatusConfig: Record<string, StatusBadgeConfig> = {
  PENDING: {
    label: "Chờ xử lý",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300",
    dotClassName: "bg-amber-500",
  },
  PROCESSING: {
    label: "Đang kiểm tra",
    className:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300",
    dotClassName: "bg-sky-500",
  },
  PURCHASE: {
    label: "Nhập kho",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300",
    dotClassName: "bg-emerald-500",
  },
  RETURN: {
    label: "Trả hàng",
    className:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300",
    dotClassName: "bg-rose-500",
  },
};

function getStatusConfig(
  status: string | null | undefined,
  config: Record<string, StatusBadgeConfig>,
) {
  if (!status) {
    return defaultStatusConfig;
  }

  return config[status] ?? {
    ...defaultStatusConfig,
    label: status,
  };
}

function StatusBadge({ config }: { config: StatusBadgeConfig }) {
  return (
    <Badge
      variant="outline"
      className={`inline-flex min-w-[112px] justify-start gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <span className={`size-1.5 rounded-full ${config.dotClassName}`} />
      {config.label}
    </Badge>
  );
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
          <StatusBadge
            config={getStatusConfig(
              row.original.status,
              purchaseOrderStatusConfig,
            )}
          />
        ),
      },
      {
        accessorKey: "statusTransfer",
        header: () => "Trạng thái xử lý",
        cell: ({ row }) => (
          <StatusBadge
            config={getStatusConfig(
              row.original.statusTransfer,
              processingStatusConfig,
            )}
          />
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
        accessorKey: "realPayPrice",
        header: () => <div className="text-right">Giá thực trả</div>,
        cell: ({ row }) => (
          <div className="text-right font-semibold tabular-nums text-foreground">
            {formatNullableCurrency(row.original.realPayPrice)}
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
                    record.statusTransfer === "PENDING" && (
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
                    )
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
      <Card className="admin-table-card">
        <CardHeader className="admin-table-toolbar">
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
              <TableHeader className="admin-table-header">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="admin-table-head"
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
                      className="admin-table-row"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="admin-table-cell">
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
        <div className="admin-table-footer flex flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row text-sm text-muted-foreground">
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
