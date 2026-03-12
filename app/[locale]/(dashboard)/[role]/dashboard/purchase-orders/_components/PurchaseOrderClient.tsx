"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import PurchaseOrderSkeleton from "./PurchaseOrderSkeleton";

// ---------- Types ----------
type PurchaseOrderStatus = "PENDING" | "APPROVED" | "RECEIVED" | "CANCELLED";

type PurchaseOrder = {
  id: string;
  code: string;
  supplierName: string;
  createdAt: string;
  status: PurchaseOrderStatus;
  totalPrice: number;
};

// ---------- Mock data ----------
const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: "1",
    code: "PO-20260301",
    supplierName: "Nhà xuất bản Kim Đồng",
    createdAt: "2026-03-01T10:30:00Z",
    status: "APPROVED",
    totalPrice: 15_500_000,
  },
  {
    id: "2",
    code: "PO-20260302",
    supplierName: "Alpha Books",
    createdAt: "2026-03-02T08:00:00Z",
    status: "PENDING",
    totalPrice: 8_200_000,
  },
  {
    id: "3",
    code: "PO-20260303",
    supplierName: "NXB Trẻ",
    createdAt: "2026-03-03T14:15:00Z",
    status: "RECEIVED",
    totalPrice: 22_000_000,
  },
  {
    id: "4",
    code: "PO-20260304",
    supplierName: "Nhã Nam",
    createdAt: "2026-03-04T09:45:00Z",
    status: "CANCELLED",
    totalPrice: 5_600_000,
  },
  {
    id: "5",
    code: "PO-20260305",
    supplierName: "Fahasa Distribution",
    createdAt: "2026-03-05T11:20:00Z",
    status: "PENDING",
    totalPrice: 12_350_000,
  },
  {
    id: "6",
    code: "PO-20260306",
    supplierName: "Minh Long Books",
    createdAt: "2026-03-06T16:00:00Z",
    status: "APPROVED",
    totalPrice: 9_800_000,
  },
];

// ---------- Helpers ----------
const STATUS_CONFIG: Record<
  PurchaseOrderStatus,
  { label: string; className: string; dotClassName: string }
> = {
  PENDING: {
    label: "Chờ duyệt",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    dotClassName: "bg-amber-500",
  },
  APPROVED: {
    label: "Đã duyệt",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    dotClassName: "bg-blue-500",
  },
  RECEIVED: {
    label: "Đã nhận",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    dotClassName: "bg-emerald-500",
  },
  CANCELLED: {
    label: "Đã huỷ",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
    dotClassName: "bg-red-500",
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
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

// ---------- Component ----------
export function PurchaseOrderClient() {
  // TODO: Replace with real query
  const isPending = false;
  const data = MOCK_PURCHASE_ORDERS;

  const columns = useMemo<ColumnDef<PurchaseOrder>[]>(
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
        accessorKey: "supplierName",
        header: () => "Nhà cung cấp",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Package className="size-3.5 text-muted-foreground" />
            </div>
            <span className="font-medium text-foreground">
              {row.original.supplierName}
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
        cell: ({ row }) => {
          const config = STATUS_CONFIG[row.original.status];
          return (
            <Badge
              variant="outline"
              className={`gap-1.5 font-medium ${config.className}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`}
              />
              {config.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Tổng giá</div>,
        cell: ({ row }) => (
          <div className="text-right font-semibold tabular-nums text-foreground">
            {formatCurrency(row.original.totalPrice)}
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right">Thao tác</div>,
        cell: () => (
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Eye className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Đơn nhập hàng
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý đơn nhập hàng từ nhà cung cấp.
          </p>
        </div>
        <Link href="./purchase-orders/create">
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Plus className="size-4" />
            Thêm đơn hàng mới
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">
              Danh sách đơn nhập
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
                <PurchaseOrderSkeleton />
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
                    Không có đơn nhập hàng nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 dark:bg-slate-900/20 px-6 py-4 md:flex-row text-sm text-muted-foreground">
          <p>Hiển thị 6 / 6 đơn nhập hàng</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="default"
                className="h-8 w-8 p-0 bg-slate-950 dark:bg-slate-50 dark:text-slate-900 shadow-sm"
              >
                1
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
