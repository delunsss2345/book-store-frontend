import React from "react";
import Image from "next/image";
import {
  Star,
  BookOpen,
  Calendar,
  Building2,
  Tag,
  Layers,
  Wallet,
  Box,
  CheckCircle2,
  XCircle,
  Edit3,
} from "lucide-react";

// Shadcn UI Components
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useModalStore } from "@/features/modal";
import { AdminBook } from "@/types/response/admin.response";

export default function ModalBookDetail({ onClose }: { onClose: () => void }) {
  const book = useModalStore((state) => state.bookDetail) as AdminBook;

  if (!book) return null;

  const title = book.translation?.title || "No Title";
  const description =
    book.translation?.description || "No description available.";

  return (
    <div className="space-y-6">
      {/* 1. Header & Cover Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="shrink-0 w-40 h-56 overflow-hidden shadow-md border-muted">
          {book.coverImageUrl ? (
            <Image
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
              {book.translation?.languageId === 1 ? "VN" : "EN"}
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="text-sm font-semibold text-foreground">4.5</span>
            </div>
          </div>

          <ScrollArea className="h-20 w-full rounded-md border bg-muted/30 p-2">
            <p className="text-xs leading-relaxed text-muted-foreground italic">
              "{description}"
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
          value={book.publisherId.slice(0, 8)}
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
                      {v.format}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {v.isbn}
                  </TableCell>
                  <TableCell className="text-right py-2">
                    <span
                      className={
                        v.stock < 10 ? "text-destructive font-bold" : ""
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
        <Button className="flex-1 gap-2 shadow-sm" variant="default">
          <Edit3 className="w-4 h-4" /> Edit Book
        </Button>
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

/**
 * Sub-component for small stat blocks
 */
function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {React.cloneElement(icon as React.ReactElement, {
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
