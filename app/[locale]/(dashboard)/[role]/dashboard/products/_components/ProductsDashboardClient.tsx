"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAdminBooksQuery } from "@/features/admin";
import type { AdminBook } from "@/types/response/admin.response";
import useTranslator from "@/hooks/use-translator";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  ImageIcon,
  Languages,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ModalType, useModalStore } from "@/features/modal";
import { ActionDropdown } from "@/components/common/ActionDropdownMenu";
import { variantMenuItems } from "./data/action-products";
import { useRouter } from "@/i18n/navigation";
import ProductsTableSkeleton from "./ProductsTableSkeleton";

export function ProductsDashboardClient() {
  const { t } = useTranslator();
  const { onOpen, getIsOpen, setBookDetail } = useModalStore();

  const {
    data: books = [] as AdminBook[],
    isLoading,
    error,
    isPending,
  } = useAdminBooksQuery();

  const router = useRouter();
  const { role } = useParams<{ role: string }>();
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const columns = useMemo<ColumnDef<AdminBook>[]>(
    () => [
      {
        id: "title",
        header: () => t("dashboard.products.table.columns.title"),
        cell: ({ row }) => {
          const { coverImageUrl, id, translation } = row.original;
          const title = translation?.title ?? "";
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-9 shrink-0 items-center justify-center overflow-hidden rounded border bg-muted shadow-sm">
                {coverImageUrl ? (
                  <img
                    src={coverImageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-4 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground line-clamp-1">
                  {title}
                </span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/70">
                  ID: {id}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "pageCount",
        header: () => t("dashboard.products.table.columns.pageCount"),
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="size-3.5" />
            <span>{row.original.pageCount ?? "-"}</span>
          </div>
        ),
      },
      {
        accessorKey: "isActive",
        header: () => t("dashboard.products.table.columns.status"),
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("dashboard.products.table.status.active")}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-zinc-50 text-zinc-500 border-zinc-200 font-medium"
            >
              {t("dashboard.products.table.status.inactive")}
            </Badge>
          ),
      },
      {
        id: "actions",
        header: () => (
          <div onClick={(e) => e.stopPropagation()} className="text-right">
            {t("dashboard.products.table.columns.actions")}
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              onClick={() => {
                onOpen(ModalType.BOOK_DETAIL);
                setBookDetail(row.original);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              onClick={() =>
                router.push({
                  pathname: "/[role]/dashboard/products/edit",
                  params: { role },
                })
              }
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-4" />
            </Button>
            <ActionDropdown items={variantMenuItems} />
          </div>
        ),
      },
    ],
    [t],
  );

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const summaryCards = [
    {
      label: t("dashboard.products.summary.totalProducts"),
      value: 128,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: t("dashboard.products.summary.activeProducts"),
      value: 96,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
    {
      label: t("dashboard.products.summary.totalAuthors"),
      value: 54,
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: t("dashboard.products.summary.totalPublishers"),
      value: 27,
      icon: Building2,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* Header Section: Tách biệt tiêu đề và nút bấm */}
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
          onClick={() =>
            router.push({
              pathname: "/[role]/dashboard/products/create",
              params: { role },
            })
          }
          className="w-fit gap-2 bg-slate-950 hover:bg-slate-800 text-white shadow-md transition-all"
        >
          <Plus className="size-4" /> Add New Product
        </Button>
      </div>

      {/* Summary Cards: Có Icon và khoảng cách đều */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 px-6 py-4 md:flex-row text-sm text-muted-foreground">
          <p>
            {t("dashboard.products.pagination.summary", { perPage: 8, total: 128 })}
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
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "ghost"}
                  className={`h-8 w-8 p-0 ${page === 1 ? "bg-slate-950 shadow-sm" : ""}`}
                >
                  {page}
                </Button>
              ))}
              <span className="px-1">...</span>
              <Button variant="ghost" className="h-8 w-8 p-0">
                12
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 ml-4 border-l pl-4">
              <span className="whitespace-nowrap">Go to</span>
              <Input
                defaultValue="1"
                className="h-8 w-12 text-center text-xs"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
