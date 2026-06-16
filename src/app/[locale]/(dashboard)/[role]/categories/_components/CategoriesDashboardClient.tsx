"use client";

import { useAdminCategoriesStatsQuery } from "@/features/admin";
import { useCategoriesQuery } from "@/features/category";
import useTranslator from "@/hooks/use-translator";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import type { CategoryItemData } from "@/types/response/category.response";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CheckCircle2,
  Filter,
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";
import CategoriesTableSkeleton from "./CategoriesTableSkeleton";

export function CategoriesDashboardClient() {
  const { t } = useTranslator();
  const { data, isPending: isPendingCategories } = useCategoriesQuery();
  const { data: categoryStats } = useAdminCategoriesStatsQuery();

  const categories = data?.items ?? [];
  const totalCategories = categoryStats?.totalCategories ?? 0;
  const activeCategories = categoryStats?.activeCategories ?? 0;

  const columns = useMemo<ColumnDef<CategoryItemData>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => t("dashboard.categories.table.columns.name"),
        cell: ({ row }) => (
          <span className="font-semibold text-foreground">
            {row.original.name}
          </span>
        ),
      },
      {
        accessorKey: "slug",
        header: () => t("dashboard.categories.table.columns.slug"),
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {row.original.slug ?? "-"}
          </code>
        ),
      },
      {
        accessorKey: "isActive",
        header: () => t("dashboard.categories.table.columns.status"),
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
            >
              {t("dashboard.categories.status.active")}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-zinc-50 text-zinc-500 border-zinc-200 font-medium"
            >
              {t("dashboard.categories.status.inactive")}
            </Badge>
          ),
      },
      {
        accessorKey: "sortOrder",
        header: () => t("dashboard.categories.table.columns.sortOrder"),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.sortOrder ?? "-"}
          </span>
        ),
      },
      {
        id: "actions",
        header: () => (
          <div onClick={(event) => event.stopPropagation()} className="text-right">
            {t("dashboard.categories.table.columns.actions")}
          </div>
        ),
        cell: () => (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {t("dashboard.categories.table.actions.label")}
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4" />
                  {t("dashboard.categories.table.actions.edit")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t("dashboard.categories.table.actions.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [t],
  );

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const summaryCards = [
    {
      label: t("dashboard.categories.summary.totalCategories"),
      value: totalCategories,
      icon: LayoutGrid,
      color: "text-blue-600",
    },
    {
      label: t("dashboard.categories.summary.activeCategories"),
      value: activeCategories,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("dashboard.categories.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.categories.subtitle")}
          </p>
        </div>
        <Button className="w-fit gap-2 bg-slate-950 hover:bg-slate-800 text-white shadow-md transition-all">
          <Plus className="size-4" /> {t("dashboard.categories.addButton")}
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {summaryCards.map((card) => (
          <Card
            key={card.label}
            className="border-none shadow-sm ring-1 ring-slate-200"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className={`size-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">Catalog</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard.categories.searchPlaceholder")}
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
              {isPendingCategories ? (
                <CategoriesTableSkeleton />
              ) : table.getRowModel().rows.length ? (
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
                    {t("dashboard.categories.empty")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
