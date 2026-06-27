"use client";

import {
  useAdminBookQuery,
  useUpdateBookVariantPriceMutation,
} from "@/features/admin";
import { useModalStore } from "@/features/modal";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type {
  AdminBookVariant,
  AdminBookVariantPurchaseOrderItem,
} from "@/types/request/admin.request";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  CircleDollarSign,
  ImageIcon,
  PackageOpen,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getFormatLabel } from "../ModalBookDetail/helpers";

type ModalBookVariantPurchasesProps = {
  onClose: () => void;
};

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

const getPurchasePrice = (item: AdminBookVariantPurchaseOrderItem) =>
  item.price ?? item.unitPrice;

export default function ModalBookVariantPurchases({
  onClose,
}: ModalBookVariantPurchasesProps) {
  const bookId = useModalStore((state) => state.bookDetailId);
  const bookPreview = useModalStore((state) => state.bookDetailPreview);
  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const languageId = locale === "en" ? 2 : 1;
  const queryClient = useQueryClient();
  const { mutateAsync: updateBookVariantPrice, isPending: isUpdating } =
    useUpdateBookVariantPriceMutation();

  const { data: book, isLoading } = useAdminBookQuery(bookId || "", 'view_price');

  if (!bookId) return null;

  if (isLoading) {
    return <VariantPurchaseSkeleton />;
  }

  if (!book) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Không tìm thấy thông tin sách.
      </div>
    );
  }

  const title =
    bookPreview?.title ??
    book.translation?.find((item) => item.languageId === languageId)?.title ??
    book.translation?.[0]?.title ??
    `Book #${book.id}`;
  const coverImageUrl = book.coverImageUrl ?? bookPreview?.coverImageUrl;
  const authors = book.authorName ?? bookPreview?.authors;
  const variants = book.variants ?? [];
  const purchaseItemCount = variants.reduce(
    (total, variant) => total + (variant.purchaseOrderItem?.length ?? 0),
    0,
  );

  const handleUpdatePrice = async (
    variant: AdminBookVariant,
    item: AdminBookVariantPurchaseOrderItem,
  ) => {
    if (!item.id) {
      toast.error("Purchase order item không hợp lệ.");
      return;
    }

    try {
      await updateBookVariantPrice({
        variantId: variant.id,
        payload: { purchaseOrderItemId: item.id },
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin", "books", bookId] }),
        queryClient.invalidateQueries({ queryKey: ["admin", "books"] }),
        queryClient.invalidateQueries({ queryKey: ["admin", "book-variants"] }),
      ]);
      toast.success("Đã cập nhật giá variant.");
    } catch {
      toast.error("Không thể cập nhật giá variant.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 border-b pb-5 pr-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted shadow-sm">
            {coverImageUrl ? (
              <Image
                unoptimized
                src={coverImageUrl}
                alt={title}
                width={64}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="size-5 text-muted-foreground/45" />
            )}
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <CircleDollarSign className="size-4" />
              <span>Variant & purchase pricing</span>
            </div>
            <h2 className="truncate text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            {authors ? (
              <p className="mt-1 truncate text-xs font-medium text-muted-foreground">
                {authors}
              </p>
            ) : null}
            <p className="mt-1 text-sm text-muted-foreground">
              Cập nhật giá bán từ từng purchase order item của variant.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Badge variant="secondary" className="h-8 rounded-md px-3">
            {variants.length} variant
          </Badge>
          <Badge variant="outline" className="h-8 rounded-md px-3">
            {purchaseItemCount} purchase item
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {variants.length ? (
          variants.map((variant) => (
            <VariantPurchasePanel
              key={variant.id}
              variant={variant}
              isUpdating={isUpdating}
              onUpdatePrice={handleUpdatePrice}
            />
          ))
        ) : (
          <div className="rounded-md border border-dashed py-12 text-center text-sm text-muted-foreground">
            Sách này chưa có variant.
          </div>
        )}
      </div>

      <div className="flex justify-end border-t pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

function VariantPurchasePanel({
  variant,
  isUpdating,
  onUpdatePrice,
}: {
  variant: AdminBookVariant;
  isUpdating: boolean;
  onUpdatePrice: (
    variant: AdminBookVariant,
    item: AdminBookVariantPurchaseOrderItem,
  ) => void;
}) {
  const purchaseItems = variant.purchaseOrderItem ?? [];

  return (
    <section className="overflow-hidden rounded-lg border bg-card">
      <div className="grid gap-3 border-b bg-muted/30 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-md">
              {getFormatLabel(variant.format)}
            </Badge>
            <span className="text-sm font-semibold text-foreground">
              Edition {variant.edition || "--"}
            </span>
            {variant.isActive ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="size-3" />
                Active
              </span>
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                Inactive
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>
              ISBN: <span className="font-mono">{variant.isbn || "--"}</span>
            </span>
            <span>Stock: {variant.stock ?? "--"}</span>
            <span>
              Current price:{" "}
              <strong className="text-foreground">
                {formatCurrency(variant.price, variant.currencyCode)}
              </strong>
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="h-8 w-fit rounded-md px-3">
          {purchaseItems.length} purchase order item
        </Badge>
      </div>

      {purchaseItems.length ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[220px]">Purchase order</TableHead>
                <TableHead className="min-w-[180px] text-right">
                  Unit price
                </TableHead>
                <TableHead className="min-w-[140px] text-right">
                  Discount
                </TableHead>
                <TableHead className="min-w-[180px] text-right">
                  Purchase price
                </TableHead>
                <TableHead className="min-w-[150px] text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseItems.map((item) => {
                const nextPrice = getPurchasePrice(item);
                const isCurrentPrice =
                  Number(variant.price) === Number(nextPrice);

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-mono text-xs font-semibold">
                          {item.purchaseOrderId}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          item: {item.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.unitPrice, variant.currencyCode)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.discountPrice ? `${item.discountPrice}%` : "--"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-emerald-600">
                        {formatCurrency(nextPrice, variant.currencyCode)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        disabled={isUpdating || isCurrentPrice}
                        onClick={() => onUpdatePrice(variant, item)}
                      >
                        {isCurrentPrice ? "Current" : "Update price"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
          <PackageOpen className="size-4" />
          Variant này chưa có purchase order item.
        </div>
      )}
    </section>
  );
}

function VariantPurchaseSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="border-b pb-5">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="mt-3 h-7 w-2/3 rounded bg-muted" />
        <div className="mt-2 h-4 w-1/2 rounded bg-muted/70" />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="rounded-lg border">
          <div className="border-b p-4">
            <div className="h-5 w-44 rounded bg-muted" />
            <div className="mt-3 h-4 w-2/3 rounded bg-muted/70" />
          </div>
          <div className="space-y-3 p-4">
            <div className="h-4 w-full rounded bg-muted/70" />
            <div className="h-4 w-5/6 rounded bg-muted/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
