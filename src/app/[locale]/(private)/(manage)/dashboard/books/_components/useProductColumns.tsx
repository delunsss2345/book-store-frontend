"use client";

import { ModalType, useModalStore } from "@/features/modal";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import type { AdminBookListItem } from "@/types/response/admin.response";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CircleDollarSign,
  ImageIcon,
  Pencil,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Translator = (key: string) => string;

export function useProductColumns(t: Translator) {
  const { onOpen, setBookDetailId, setBookDetailPreview } = useModalStore();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "vi";

  return useMemo<ColumnDef<AdminBookListItem>[]>(
    () => [
      {
        id: "title",
        header: () => t("dashboard.products.table.columns.title"),
        cell: ({ row }) => {
          const { coverImageUrl, id, title } = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-9 shrink-0 items-center justify-center overflow-hidden rounded border bg-muted shadow-sm">
                {coverImageUrl ? (
                  <Image
                    unoptimized
                    src={coverImageUrl}
                    alt={title}
                    width={36}
                    height={48}
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
        accessorKey: "authors",
        header: () => "Tác giả",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-sm font-medium">
            {row.original.authors || "—"}
          </span>
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
                window.open(`/${locale}/detail/${row.original.slug}`, "_blank");
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Xem trực tiếp trên cửa hàng"
            >
              <ExternalLink className="size-4" />
            </Button>
            <Button
              onClick={() => {
                setBookDetailId(row.original.id);
                setBookDetailPreview({
                  id: row.original.id,
                  title: row.original.title,
                  coverImageUrl: row.original.coverImageUrl,
                  authors: row.original.authors,
                });
                onOpen(ModalType.BOOK_VARIANT_PURCHASES);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-emerald-600"
              title="Sửa giá nhanh: xem variant và purchase order item"
              aria-label="Sửa giá nhanh: xem variant và purchase order item"
            >
              <CircleDollarSign className="size-4" />
            </Button>
            <Button
              onClick={() => {
                router.push(`/dashboard/books/${row.original.id}/edit`);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Chỉnh sửa thông tin sách"
              aria-label="Chỉnh sửa thông tin sách"
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onOpen, router, setBookDetailId, setBookDetailPreview, t, locale],
  );
}
