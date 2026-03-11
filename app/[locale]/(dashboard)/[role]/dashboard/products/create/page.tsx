"use client";

import React, { useState } from "react";
import { Wallet, Languages, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import VariantCreate from "./_components/VariantCreate";
import { MagicFillCard } from "./_components/MagicFillCard";
import { PhysicalSpecsCard } from "./_components/PhysicalSpecsCard";
import { ImagePreviewCard } from "./_components/ImagePreviewCard";
import { useSearchStore } from "@/features/search/store/search.store";
import { useSearchIsbnMutation } from "@/features/search/hooks/use-search-isbn";
import HeaderCreate from "./_components/HeaderCreate";
import { AdminBookVariant } from "@/types/response/admin.response";
import { convertIsbnResultToBookSchema } from "@/utils/convert-book";
import { useCreateBookAllMutation } from "@/features/admin/hooks/use-create-book-all";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { useCategoryQuery } from "@/features/category/hooks/use-category-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function CreateBookPage() {
  const t = useTranslations();
  const [variants, setVariants] = useState<AdminBookVariant[]>([]);
  const [language, setLanguage] = useState<string>("vi");
  const [categoryId, setCategoryId] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("");

  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierQuery();
  const suppliers = supplierData?.data?.items || [];

  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryQuery({ limit: 100, isActive: true });
  const categories = categoryData?.data?.items || [];

  const { isbnSearchResult } = useSearchStore();
  const { mutateAsync: searchIsbn, isPending: searchIsbnPending } =
    useSearchIsbnMutation();

  const { mutateAsync: createBookAll, isPending: createBookAllPending } =
    useCreateBookAllMutation();

  const onScanHandler = (isbn: string, lang: string) => {
    toast.promise(searchIsbn({ isbn, lang }), {
      loading: t("dashboard.products.create.toast.scanLoading"),
      success: t("dashboard.products.create.toast.scanSuccess"),
      error: t("dashboard.products.create.toast.scanError"),
    });
    setLanguage(lang);
  };

  const onSaveHandler = async () => {
    // Convert logic can later be updated to use categoryId and supplierId, 
    // but the instruction states "không đổi logic code" so I'm passing them to state only for now.
    const bookData = convertIsbnResultToBookSchema(
      isbnSearchResult,
      variants,
      language,
    );
    console.log("Saving book with metadata:", { bookData, categoryId, supplierId });

    if (!bookData) return;
    toast.promise(createBookAll(bookData), {
      loading: t("dashboard.products.create.toast.createLoading"),
      success: t("dashboard.products.create.toast.createSuccess"),
      error: t("dashboard.products.create.toast.createError"),
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 lg:p-6 space-y-4">
      <HeaderCreate
        onSaveHandler={onSaveHandler}
        isSaving={createBookAllPending}
      />

      {/* MAGIC FILL */}
      <MagicFillCard onScan={onScanHandler} isPending={searchIsbnPending} />

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COMPACT COLUMN */}
        <div className="lg:col-span-8 space-y-5">
          {/* Content */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/30 py-3 px-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Languages className="size-4" />
                  <CardTitle className="text-sm">
                    {t("dashboard.products.create.contentTitle")}{" "}
                    <span className="text-muted-foreground font-medium">
                      (
                      {language === "vi"
                        ? t("dashboard.products.create.languageVietnamese")
                        : t("dashboard.products.create.languageEnglish")}
                      )
                    </span>
                  </CardTitle>
                </div>

                {!!isbnSearchResult && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                    {t("dashboard.products.create.loadedData")}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  {t("dashboard.products.create.bookTitleLabel")}
                </Label>
                <Input
                  placeholder={t(
                    "dashboard.products.create.bookTitlePlaceholder",
                  )}
                  className="h-9 bg-slate-50/50 text-sm"
                  key={`title-${isbnSearchResult?.title}`}
                  defaultValue={isbnSearchResult?.title || ""}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  {t("dashboard.products.create.descriptionLabel")}
                </Label>
                <Textarea
                  placeholder={t(
                    "dashboard.products.create.descriptionPlaceholder",
                  )}
                  className="min-h-24 leading-relaxed text-sm bg-slate-50/50 resize-y"
                  key={`desc-${isbnSearchResult?.description}`}
                  defaultValue={isbnSearchResult?.description || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30 py-3 px-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Wallet className="size-4" />
                  <CardTitle className="text-sm">
                    {t("dashboard.products.create.variantPriceTitle")}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600 text-[10px] h-5 px-1.5">
                    {t("dashboard.products.create.defaultBadge")}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                    {t("dashboard.products.create.variantCount", {
                      count: variants?.length ?? 0,
                    })}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <VariantCreate variants={variants} setVariants={setVariants} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT METADATA COLUMN */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-4">
          <ImagePreviewCard
            imageUrl={isbnSearchResult?.coverImageUrl || ""}
          />

          {/* NEW METADATA CARD */}
          <Card className="shadow-sm border-amber-100">
            <CardHeader className="border-b bg-amber-50/30 py-3 px-4">
              <div className="flex items-center gap-2 text-amber-700">
                <Tag className="size-4" />
                <CardTitle className="text-sm font-semibold tracking-wide">
                  Phân loại / Metadata
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Danh mục (Category)
                </Label>
                <Select value={categoryId} onValueChange={setCategoryId} disabled={isCategoryLoading}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Chọn danh mục..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-sm">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Nhà cung cấp (Supplier)
                </Label>
                <Select value={supplierId} onValueChange={setSupplierId} disabled={isSupplierLoading}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Chọn nhà cung cấp..." />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id} className="text-sm">
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <PhysicalSpecsCard
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

          {/* Draft Suggestion */}
          <div className="rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">{t("dashboard.products.create.creationStatus")}</span>
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-background">
                Draft
              </Badge>
            </div>
            <p className="mt-1.5 leading-relaxed">
              {t("dashboard.products.create.creationStatusDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
