import {
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Layers,
  Tag,
  Wallet,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { useModalStore } from "@/features/modal";
import { useAdminBookQuery } from "@/features/admin";
import { useParams } from "next/navigation";
import { BookWithTranslations, getFormatLabel } from "./helpers";

const formatCurrency = (
  value: string | number | null | undefined,
  currencyCode: string | null | undefined,
) => {
  if (value == null || value === "") return "--";

  const amount = Number(value);
  if (!Number.isFinite(amount)) return "--";

  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currencyCode || "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("vi-VN")} ${currencyCode || "VND"}`;
  }
};

export default function ModalBookDetail({ onClose }: { onClose: () => void }) {
  const bookId = useModalStore((state) => state.bookDetailId);
  const onSelectPurchaseVariant = useModalStore(
    (state) => state.purchaseOrderVariantSelect,
  );
  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const languageId = locale === "en" ? 2 : 1;

  const { data: book, isLoading } = useAdminBookQuery(bookId || "");

  if (!bookId) return null;

  if (isLoading) {
    return <ModalBookDetailSkeleton />;
  }

  if (!book) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Không tìm thấy thông tin sách.
      </div>
    );
  }

  const translations =
    (book as BookWithTranslations).translations ||
    (book as BookWithTranslations).translation;
  const transObj = Array.isArray(translations)
    ? translations.find((t) => t.languageId === languageId) || translations[0]
    : translations;
  const title = transObj?.title || "No Title";
  const description = transObj?.description || "No description available.";
  const compactStats = [
    {
      icon: <Calendar />,
      label: "Năm XB",
      value: book.publicationYear || "--",
    },
    {
      icon: <Layers />,
      label: "Trang",
      value: book.pageCount || "--",
    },
    {
      icon: <Tag />,
      label: "Nặng",
      value: book.weightGrams ? `${book.weightGrams}g` : "--",
    },
    {
      icon: <Building2 />,
      label: "NXB",
      value: book.publisherName || String(book.publisherId || "--"),
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header & Cover Section */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="h-40 w-28 shrink-0 overflow-hidden border-muted shadow-sm">
          {book.coverImageUrl ? (
            <Image
              unoptimized
              src={book.coverImageUrl}
              alt={title}
              width={112}
              height={160}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
        </Card>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {book.authorName || "Không rõ tác giả"} · ID{" "}
                <span className="font-mono">{book.id}</span>
              </p>
            </div>
            <Badge
              variant={book.isActive ? "default" : "destructive"}
              className="shrink-0"
            >
              {book.isActive ? (
                <CheckCircle2 className="w-3 h-3 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {book.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {compactStats.map((item) => (
              <StatBox
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <p className="line-clamp-2 rounded-md border bg-muted/25 px-3 py-2 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* 3. Variants Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Variant & so sánh giá
            </h3>
          </div>
          <Badge variant="secondary" className="rounded-md text-[11px]">
            {book.variants?.length || 0} variant
          </Badge>
        </div>

        <div className="overflow-hidden rounded-md border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[110px]">Variant</TableHead>
                <TableHead className="min-w-[140px]">ISBN</TableHead>
                <TableHead className="text-right">Tồn</TableHead>
                <TableHead className="min-w-[160px] text-right font-bold text-foreground">
                  Giá bán
                </TableHead>
                <TableHead className="min-w-[150px] text-right">
                  Giá nhập
                </TableHead>
                <TableHead className="min-w-[150px] text-right">
                  Giá hiện tại
                </TableHead>
                {onSelectPurchaseVariant && (
                  <TableHead className="text-right">Chọn</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {book.variants?.map((v) => {
                const purchasePrice = v.purchaseOrderItem?.[0]?.unitPrice;

                return (
                  <TableRow key={v.id}>
                    <TableCell className="py-2 font-bold">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-[10px]">
                          {getFormatLabel(v.format)}
                        </Badge>
                        {v.edition ? (
                          <p className="text-[11px] text-muted-foreground">
                            Lần {v.edition}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {v.isbn || "--"}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <span
                        className={
                          (v?.stock ?? 0) < 10
                            ? "font-bold text-destructive"
                            : ""
                        }
                      >
                        {v.stock ?? "--"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <div className="font-bold text-emerald-600">
                        {formatCurrency(v.price, v.currencyCode)}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        variant.price
                      </p>
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <div className="font-semibold text-foreground">
                        {formatCurrency(purchasePrice, v.currencyCode)}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        unitPrice
                      </p>
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                      >
                        Chọn giá hiện tại
                      </Button>
                    </TableCell>
                    {onSelectPurchaseVariant && (
                      <TableCell className="py-2 text-right">
                        <Button
                          size="sm"
                          disabled={!v.isActive}
                          onClick={() => {
                            onSelectPurchaseVariant(v, { id: book.id, title });
                            onClose();
                          }}
                        >
                          Chọn
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 4. Footer Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-2.5 py-2 text-card-foreground">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {React.cloneElement(icon, {
          className: "h-3 w-3",
        })}
        <span className="text-[10px] font-bold uppercase tracking-tight">
          {label}
        </span>
      </div>
      <p className="mt-0.5 truncate text-xs font-bold">{value || "--"}</p>
    </div>
  );
}

function ModalBookDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Header & Cover Section Skeleton */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0 w-40 h-56 rounded bg-muted/60" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-2/3 bg-muted/60 rounded" />
          <div className="h-4 w-1/4 bg-muted/60 rounded" />
          <div className="h-20 w-full bg-muted/30 rounded p-2" />
        </div>
      </div>

      {/* 2. Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg border bg-card p-3 space-y-2">
            <div className="h-3 w-1/2 bg-muted/55 rounded" />
            <div className="h-4 w-3/4 bg-muted/55 rounded" />
          </div>
        ))}
      </div>

      {/* 3. Variants Table Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-1/4 bg-muted/60 rounded" />
        <div className="rounded-md border p-4 space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 w-16 bg-muted/60 rounded" />
              <div className="h-4 w-32 bg-muted/60 rounded" />
              <div className="h-4 w-8 bg-muted/60 rounded" />
              <div className="h-4 w-20 bg-muted/60 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
