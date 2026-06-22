"use client";

import { useGetPurchaseOrdersQuery } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { PurchaseOrderPagination } from "./PurchaseOrderPagination";
import PurchaseOrderSkeleton from "./PurchaseOrderSkeleton";
import { usePurchaseOrderColumns } from "./usePurchaseOrderColumns";

export function PurchaseOrderClient() {
  const { data: purchaseOrders, isPending } = useGetPurchaseOrdersQuery();
  const columns = usePurchaseOrderColumns();

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
                <PurchaseOrderSkeleton />
              ) : table.getRowModel().rows.length ? (
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

        <PurchaseOrderPagination />
      </Card>
    </div>
  );
}
