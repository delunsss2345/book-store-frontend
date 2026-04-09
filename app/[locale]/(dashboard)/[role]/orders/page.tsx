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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  const { data: orders = [], isPending: isPendingOrders } =
    useAdminOrdersQuery();

  const onOpen = useModalStore((state) => state.onOpen);

  const { setSelectOrderDetailId } = useAdminStore();

  const columns: ColumnDef<AdminOrder>[] = [
    {
      accessorKey: "orderCode",
      header: t("dashboard.orders.table.columns.orderCode"),
      cell: ({ row }) => (
        <span className="font-bold text-blue-600">
          #{row.getValue("orderCode")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: t("dashboard.orders.table.columns.customer"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[150px]">
            {row.original?.user
              ? row.original.user?.firstName + " " + row.original.user?.lastName
              : row.original?.guestEmail}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("dashboard.orders.table.columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variants: Record<
          string,
          "outline" | "secondary" | "default" | "success" | "destructive"
        > = {
          PENDING: "outline",
          PROCESSING: "secondary",
          SHIPPED: "default",
          DELIVERED: "success", // Cần custom màu success trong tailwind
          CANCELLED: "destructive",
        };
        return <Badge >{status}</Badge>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: t("dashboard.orders.table.columns.payment"),
      cell: ({ row }) => {
        const pStatus = row.getValue("paymentStatus") as string;
        return (
          <div className="flex items-center gap-2">
            <CircleDot
              className={`h-2 w-2 ${pStatus === "PAID" ? "text-green-500" : "text-yellow-500"}`}
            />
            <span className="text-xs font-medium">{pStatus}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: t("dashboard.orders.table.columns.totalAmount"),
      cell: ({ row }) => {
        const amountValue = Number(row.getValue("totalAmount") ?? 0);
        const amount = Number.isFinite(amountValue) ? amountValue : 0;
        return (
          <div className="font-medium text-right font-mono tracking-tighter">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "placedAt",
      header: t("dashboard.orders.table.columns.placedAt"),
      cell: ({ row }) => {
        const placedAt = row.original.placedAt ?? row.original.createdAt ?? "-";
        return <span>{placedAt}</span>;
      },
    },
    {
      id: "actions",
      header: t("dashboard.orders.table.columns.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Chi tiết đơn hàng */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              setSelectOrderDetailId(row.original.id);
              onOpen(ModalType.ORDER_DETAIL_ADMIN);
            }}
          >
            <Eye className="h-4 w-4" /> {t("dashboard.orders.details.view")}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {t("dashboard.orders.table.actions.label")}
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />{" "}
                {t("dashboard.orders.table.actions.exportPdf")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                {t("dashboard.orders.table.actions.cancelOrder")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("dashboard.orders.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("dashboard.orders.subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />{" "}
            {t("dashboard.orders.exportExcel")}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("dashboard.orders.searchPlaceholder")}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> {t("dashboard.orders.filterButton")}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "totalAmount" ? "text-right" : ""
                    }
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
            {isPendingOrders ? (
              <OrdersTableSkeleton />
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
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
