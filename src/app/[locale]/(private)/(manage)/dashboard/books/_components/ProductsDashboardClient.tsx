"use client";

import { useAdminBooksQuery, useAdminBooksStatsQuery } from "@/features/admin";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type { AdminBookListItem } from "@/types/response/admin.response";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { ProductSummaryCards } from "./ProductSummaryCards";
import { ProductsPagination } from "./ProductsPagination";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import { useProductColumns } from "./useProductColumns";
import { useParams, useRouter } from "next/navigation";

export function ProductsDashboardClient() {
  const { t } = useTranslator();
  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const languageId = locale === "en" ? 2 : 1;

  const {
    data: books = [] as AdminBookListItem[],
    error: booksError,
    isPending,
  } = useAdminBooksQuery({ languageId });

  const { data: bookStats, error: bookStatsError } = useAdminBooksStatsQuery();

  const router = useRouter();

  useEffect(() => {
    const nextError = bookStatsError ?? booksError;
    if (nextError) toast.error(nextError.message);
  }, [bookStatsError, booksError]);

  const columns = useProductColumns(t);

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("dashboard.products.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý kho sách và nội dung đa ngôn ngữ.
          </p>
        </div>
        <Button
          onClick={() => router.push("books/create")}
          className="w-fit gap-2 bg-slate-950 hover:bg-slate-800 text-white shadow-md transition-all"
        >
          <Plus className="size-4" /> Add New Product
        </Button>
      </div>

      {/* Summary Cards */}
      <ProductSummaryCards bookStats={bookStats} t={t} />

      {/* Main Table Card */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">Catalog</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search title or ID..."
                  className="pl-9 w-full md:w-[300px] bg-background h-9 shadow-none"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="size-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-slate-900 font-bold h-11"
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
                <ProductsTableSkeleton />
              ) : table && table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group hover:bg-slate-50/50 transition-colors"
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
                    {t("dashboard.products.table.empty")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination Section */}
        <ProductsPagination t={t} />
      </Card>
    </div>
  );
}
