"use client";

import { ModalType, useModalStore } from "@/features/modal";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import type { AdminBook } from "@/types/response/admin.response";
import type { ColumnDef } from "@tanstack/react-table";
import { BookOpen, Eye, ImageIcon, Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Translator = (key: string) => string;

export function useProductColumns(t: Translator) {
  const { onOpen, setBookDetail } = useModalStore();
  const router = useRouter();

  return useMemo<ColumnDef<AdminBook>[]>(
    () => [
      {
        id: "title",
        header: () => t("dashboard.products.table.columns.title"),
        cell: ({ row }) => {
          const { coverImageUrl, id, translation } = row.original;
          const transObj = Array.isArray(translation)
            ? translation[0]
            : translation;
          const title = transObj?.title ?? "";
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
              onClick={() => {
                router.push(`/dashboard/books/${row.original.id}/edit`);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onOpen, router, setBookDetail, t],
  );
}
