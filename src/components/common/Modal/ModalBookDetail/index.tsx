import {
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Layers,
  Star,
  Tag,
  Wallet,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
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

export default function ModalBookDetail({ onClose }: { onClose: () => void }) {
  const bookId = useModalStore((state) => state.bookDetailId);
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

  const translations = (book as any)?.translations || book?.translation;
  const transObj = Array.isArray(translations)
    ? translations.find((t: any) => t.languageId === languageId) ||
      translations[0]
    : translations;
  const title = transObj?.title || "No Title";
  const description = transObj?.description || "No description available.";
  console.log(book.coverImageUrl);
  return (
    <div className="space-y-6">
      {/* 1. Header & Cover Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="shrink-0 w-40 h-56 overflow-hidden shadow-md border-muted">
          {book.coverImageUrl ? (
            <Image
              unoptimized
              src={book.coverImageUrl}
              alt={title}
              width={160}
              height={224}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
        </Card>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                ID: {book.id}
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

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-sm px-1.5 uppercase text-[10px] font-bold"
            >
              {/* {book.translation?.languageId === 1 ? "VN" : "EN"} */}
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="text-sm font-semibold text-foreground">4.5</span>
            </div>
          </div>

          <ScrollArea className="h-20 w-full rounded-md border bg-muted/30 p-2">
            <p className="text-xs leading-relaxed text-muted-foreground italic">
              {description}
            </p>
          </ScrollArea>
        </div>
      </div>

      {/* 2. Stats Grid using cards style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox
          icon={<Calendar />}
          label="Year"
          value={book.publicationYear}
        />
        <StatBox icon={<Layers />} label="Pages" value={book.pageCount} />
        <StatBox
          icon={<Tag />}
          label="Weight"
          value={book.weightGrams ? `${book.weightGrams}g` : "N/A"}
        />
        <StatBox
          icon={<Building2 />}
          label="Pub ID"
          value={book.publisherId ? book.publisherId.slice(0, 8) : "N/A"}
        />
      </div>

      {/* 3. Variants Table Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Wallet className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Book Variants
          </h3>
        </div>

        <div className="rounded-md border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">Format</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right font-bold text-foreground">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {book.variants?.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-bold py-2">
                    <Badge variant="outline" className="text-[10px]">
                      {typeof v.format === "string" ? v.format : (v.format as any)?.format || "Mặc định"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {v.isbn}
                  </TableCell>
                  <TableCell className="text-right py-2">
                    <span
                      className={
                        (v?.stock ?? 0) < 10 ? "text-destructive font-bold" : ""
                      }
                    >
                      {v.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-600 py-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: v.currencyCode,
                    }).format(Number(v.price))}
                  </TableCell>
                </TableRow>
              ))}
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
    <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {React.cloneElement(icon, {
          className: "w-3.5 h-3.5",
        })}
        <span className="text-[10px] font-bold uppercase tracking-tight">
          {label}
        </span>
      </div>
      <p className="text-sm font-bold truncate">{value || "---"}</p>
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
