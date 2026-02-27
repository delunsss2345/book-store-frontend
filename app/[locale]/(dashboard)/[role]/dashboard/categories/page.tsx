"use client";
import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Search,
  LayoutGrid,
} from "lucide-react";
import useTranslator from "@/hooks/use-translator";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// 1. Data Type & Mock Data
type Category = {
  id: string;
  name: string;
  slug: string;
  count: number;
  status: "Active" | "Inactive";
};

const data: Category[] = [
  {
    id: "1",
    name: "Phone",
    slug: "dien-thoai",
    count: 120,
    status: "Active",
  },
  { id: "2", name: "Laptop", slug: "laptop", count: 45, status: "Active" },
  {
    id: "3",
    name: "Accessories",
    slug: "phu-kien",
    count: 320,
    status: "Inactive",
  },
];

export default function CategoriesPage() {
  const { t } = useTranslator();
  const columns = useMemo<ColumnDef<Category>[]>(() => [
    {
      accessorKey: "name",
      header: t("dashboard.categories.table.columns.name"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: t("dashboard.categories.table.columns.slug"),
      cell: ({ row }) => (
        <code className="rounded bg-muted px-1 py-0.5 text-xs">
          {row.getValue("slug")}
        </code>
      ),
    },
    {
      accessorKey: "count",
      header: t("dashboard.categories.table.columns.count"),
    },
    {
      accessorKey: "status",
      header: t("dashboard.categories.table.columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: t("dashboard.categories.table.columns.actions"),
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("dashboard.categories.table.actions.label")}</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" /> {t("dashboard.categories.table.actions.edit")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> {t("dashboard.categories.table.actions.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [t]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-8 w-8" /> {t("dashboard.categories.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("dashboard.categories.subtitle")}
          </p>
        </div>

        {/* Modal Thêm Mới (UI Only) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> {t("dashboard.categories.addButton")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("dashboard.categories.dialog.title")}</DialogTitle>
              <DialogDescription>
                {t("dashboard.categories.dialog.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("dashboard.categories.dialog.nameLabel")}</Label>
                <Input id="name" placeholder={t("dashboard.categories.dialog.namePlaceholder")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="do-gia-dung" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t("dashboard.categories.dialog.save")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("dashboard.categories.searchPlaceholder")} className="pl-8" />
        </div>
      </div>

      {/* Shadcn Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
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
                  className="h-24 text-center"
                >
                  {t("dashboard.categories.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          {t("dashboard.categories.pagination.prev")}
        </Button>
        <Button variant="outline" size="sm" disabled>
          {t("dashboard.categories.pagination.next")}
        </Button>
      </div>
    </div>
  );
}
