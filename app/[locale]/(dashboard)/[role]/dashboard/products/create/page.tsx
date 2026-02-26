"use client";

import React from "react";
import { Wallet, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Import các components con
import VariantCreate from "./_components/VariantCreate";
import { MagicFillCard } from "./_components/MagicFillCard";
import { PhysicalSpecsCard } from "./_components/PhysicalSpecsCard";
import { ImagePreviewCard } from "./_components/ImagePreviewCard";
import { useSearchStore } from "@/features/search/store/search.store";
import { useSearchIsbnMutation } from "@/features/search/hooks/use-search-isbn";

export default function CreateBookPage() {
  const { isbnSearchResult } = useSearchStore();
  const { mutateAsync: searchIsbn, isPending: searchIsbnPending } =
    useSearchIsbnMutation();

  const onScanHandler = (isbn: string, lang: string) => {
    searchIsbn({ isbn, lang });
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* 1. MAGIC FILL SECTION */}
      <MagicFillCard onScan={onScanHandler} isPending={searchIsbnPending} />

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Nội dung chính & Biến thể */}
        <div className="lg:col-span-8 space-y-8">
          {/* Content Card */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-600">
                <Languages className="size-5" />
                <CardTitle className="text-lg">
                  Nội dung hiển thị (Vietnamese)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold">Tiêu đề sách *</Label>
                <Input
                  placeholder="Tên sách sẽ hiển thị trên web..."
                  className="h-11"
                  // Dùng key để React render lại input khi dữ liệu store thay đổi
                  key={`title-${isbnSearchResult?.title}`}
                  defaultValue={isbnSearchResult?.title || ""}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Mô tả chi tiết</Label>
                <Textarea
                  placeholder="Nội dung giới thiệu về sách..."
                  className="min-h-[250px] leading-relaxed text-base"
                  key={`desc-${isbnSearchResult?.description}`}
                  defaultValue={isbnSearchResult?.description || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Variants Card */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Wallet className="size-5" />
                  <CardTitle className="text-lg">Biến thể & Giá bán</CardTitle>
                </div>
                <Badge className="bg-emerald-500">Mặc định</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <VariantCreate />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Media & Specs */}
        <div className="lg:col-span-4 space-y-8">
          <ImagePreviewCard
            imageUrl={isbnSearchResult?.coverImageUrl || ""}
            // Bạn có thể thêm prop onUrlChange để cập nhật ngược lại store nếu cần
          />

          <PhysicalSpecsCard
            // Map chính xác các trường từ QuickBookFillResponse vào PhysicalSpecsCard
            data={{
              width: isbnSearchResult?.spec?.widthCm,
              height: isbnSearchResult?.spec?.heightCm,
              thickness: isbnSearchResult?.spec?.thicknessCm,
              weight: isbnSearchResult?.weightGrams,
              publisher: isbnSearchResult?.publisherName,
              authors: isbnSearchResult?.authorName,
              year: isbnSearchResult?.publicationYear,
              pages: isbnSearchResult?.pageCount,
            }}
          />
        </div>
      </div>
    </div>
  );
}
