"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CircleDot,
  Eye,
  FileDown,
  Filter,
  MoreHorizontal,
  Search
} from "lucide-react";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAdminOrdersQuery, useAdminStore } from "@/features/admin";
import { ModalType, useModalStore } from "@/features/modal";
import useTranslator from "@/hooks/use-translator";
import type { AdminOrder } from "@/types/response/admin.response";
import OrdersTableSkeleton from "./_components/OrdersTableSkeleton";

export default function OrdersPage() {
  const { t } = useTranslator();
  const { data: items = [], isPending: isPendingOrders } = useAdminOrdersQuery();

  const onOpen = useModalStore((state) => state.onOpen);
  const { setSelectOrderDetailId } = useAdminStore();

  const columns: ColumnDef<AdminOrder>[] = [
    {
      accessorKey: "orderCode",
      header: t("dashboard.orders.table.columns.orderCode"),
      cell: ({ row }) => (
        <span className="font-medium text-blue-600">#{row.getValue("orderCode")}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: t("dashboard.orders.table.columns.customer"),
      cell: ({ row }) => {
        const user = row.original?.user;
        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {user ? `${user.firstName} ${user.lastName}` : row.original?.guestEmail}
            </span>
            {user && <span className="text-xs text-muted-foreground">{user.email}</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: t("dashboard.orders.table.columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let variant: "outline" | "secondary" | "default" | "destructive" = "outline";

        if (status === "DELIVERED") variant = "default";
        if (status === "CANCELLED") variant = "destructive";
        if (status === "PROCESSING") variant = "secondary";

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: t("dashboard.orders.table.columns.payment"),
      cell: ({ row }) => {
        const pStatus = row.getValue("paymentStatus") as string;
        return (
          <div className="flex items-center gap-2">
            <CircleDot className={`h-2 w-2 ${pStatus === "PAID" ? "text-green-500" : "text-amber-500"}`} />
            <span className="text-xs font-medium">{pStatus}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="text-right">{t("dashboard.orders.table.columns.totalAmount")}</div>,
      cell: ({ row }) => {
        const amount = Number(row.getValue("totalAmount") ?? 0);
        return (
          <div className="text-right font-semibold">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: t("dashboard.orders.table.columns.placedAt"),
      cell: ({ row }) => <span className="text-muted-foreground">{new Date(row.original?.createdAt ?? 0).toLocaleDateString("vi-VN")}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectOrderDetailId(row.original.id);
              onOpen(ModalType.ORDER_DETAIL_ADMIN);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" /> Export PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Hủy đơn</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("dashboard.orders.title")}</h2>
          <p className="text-muted-foreground">{t("dashboard.orders.subtitle")}</p>
        </div>
        <Button variant="default" className="shadow-sm">
          <FileDown className="mr-2 h-4 w-4" /> {t("dashboard.orders.exportExcel")}
        </Button>
      </div>

      {/* Quick Stats - Dùng Card thuần của Shadcn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chờ thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {items && items.filter(i => i.paymentStatus === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Doanh thu tạm tính</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                items.reduce((acc, curr) => acc + Number(curr.totalAmount), 0)
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("dashboard.orders.searchPlaceholder")} className="pl-8 bg-white" />
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <Filter className="h-4 w-4" /> {t("dashboard.orders.filterButton")}
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPendingOrders ? (
              <OrdersTableSkeleton />
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  {t("dashboard.orders.table.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}