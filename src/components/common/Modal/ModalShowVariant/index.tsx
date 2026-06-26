"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

import { useAdminStore } from "@/features/admin";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { AdminBookVariant } from "@/types/response/admin.response";
import { CircleDollarSign, Info, Lock } from "lucide-react";

export default function ModalBookVariantPricing() {
  const { bookDraft, updateBookVariant } = useAdminStore();
  const variants = useMemo(() => bookDraft?.variants || [], [bookDraft]);
  const updateVariantPrice = useCallback(
    (variantId: string, value: string) => {
      updateBookVariant(variantId, "price", value);
    },
    [updateBookVariant],
  );

  const updateVariantStatus = useCallback(
    (variantId: string, value: boolean) => {
      updateBookVariant(variantId, "isActive", value);
    },
    [updateBookVariant],
  );
  const columns = useMemo<ColumnDef<AdminBookVariant>[]>(
    () => [
      {
        accessorKey: "variant",
        header: "Variant",
        cell: ({ row }) => (
          <div className="flex flex-col py-1">
            <span className="font-bold text-foreground">
              Edition {row.original.edition}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {row.original.format}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "isbn",
        header: "ISBN / SKU",
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
            {row.original.isbn}
          </code>
        ),
      },
      {
        accessorKey: "costPrice",
        header: () => (
          <div className="flex items-center gap-1">
            <Lock className="size-3 text-muted-foreground" />
            <span>Cost Price</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-sm font-medium text-muted-foreground/70">
            {row.original?.costPrice}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: "Sale Price",
        cell: ({ row }) => (
          <div className="relative max-w-[180px]">
            <Input
              value={row.original.price ?? ""}
              onChange={(e) =>
                updateVariantPrice(row.original.id, e.target.value)
              }
              className="h-9 border-emerald-500/20 bg-emerald-500/[0.02] font-bold focus-visible:ring-emerald-500/30"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[s10px] font-bold text-muted-foreground">
              {row.original.currencyCode || "VND"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <span className="text-sm font-semibold">{row.original.stock}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={
              row.original.isActive
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                : "bg-muted text-muted-foreground"
            }
          >
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <Switch
              className="cursor-pointer"
              checked={row.original.isActive}
              onCheckedChange={(value) =>
                updateVariantStatus(row.original.id, value)
              }
            />
          );
        },
      },
    ],
    [updateVariantPrice, updateVariantStatus],
  );

  const table = useReactTable({
    data: variants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!bookDraft) return <EmptyState />;

  return (
    <div className="w-full space-y-6 py-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
            <CircleDollarSign className="size-4" />
            <span>Pricing Manager</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Giá bán theo Variant
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {bookDraft.translation?.[0]?.title}
          </p>
        </div>
        <Badge variant="secondary" className="h-fit px-3 py-1 text-xs">
          {variants.length} Variants added
        </Badge>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-muted/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
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
                  className="h-32 text-center"
                >
                  Chưa có variant nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-4 text-xs text-blue-700 border border-blue-100">
        <Info className="size-4 shrink-0" />
        <p>
          Hệ thống sẽ tự động lưu thay đổi khi bạn nhập giá mới. Các trường như{" "}
          <b>Cost Price</b> và <b>Stock</b> được đồng bộ từ kho và không thể
          chỉnh sửa tại đây.
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed text-center p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Không tìm thấy dữ liệu sách
      </p>
    </div>
  );
}

function formatCurrency(value: number, currencyCode?: string) {
  if (!Number.isFinite(value)) return "0";
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currencyCode || "VND",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString("vi-VN")} ${currencyCode || "VND"}`;
  }
}
