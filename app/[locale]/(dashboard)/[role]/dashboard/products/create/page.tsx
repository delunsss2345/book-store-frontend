"use client";

import React, { useState } from "react";
import { Wallet, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function CreateBookPage() {
  const t = useTranslations();
  const [variants, setVariants] = useState<AdminBookVariant[]>([]);
  const [language, setLanguage] = useState<string>("vi");
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
    const bookData = convertIsbnResultToBookSchema(
      isbnSearchResult,
      variants,
      language,
    );
    console.log(bookData);

    if (!bookData) return;
    toast.promise(createBookAll(bookData), {
      loading: t("dashboard.products.create.toast.createLoading"),
      success: t("dashboard.products.create.toast.createSuccess"),
      error: t("dashboard.products.create.toast.createError"),
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] p-4 lg:p-6 space-y-6">
      <HeaderCreate onSaveHandler={onSaveHandler} isSaving={createBookAllPending} />

      {/* MAGIC FILL */}
      <MagicFillCard onScan={onScanHandler} isPending={searchIsbnPending} />

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          {/* Content */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Languages className="size-5" />
                  <CardTitle className="text-base">
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
                  <Badge variant="secondary" className="text-xs">
                    {t("dashboard.products.create.loadedData")}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-5 lg:p-6 space-y-6">
              <div className="rounded-xl border bg-background p-4 lg:p-5 space-y-2">
                <Label className="font-bold">
                  {t("dashboard.products.create.bookTitleLabel")}
                </Label>
                <Input
                  placeholder={t("dashboard.products.create.bookTitlePlaceholder")}
                  className="h-11"
                  key={`title-${isbnSearchResult?.title}`}
                  defaultValue={isbnSearchResult?.title || ""}
                />
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.products.create.tip")}
                </p>
              </div>

              <div className="rounded-xl border bg-background p-4 lg:p-5 space-y-2">
                <Label className="font-bold">
                  {t("dashboard.products.create.descriptionLabel")}
                </Label>
                <Textarea
                  placeholder={t("dashboard.products.create.descriptionPlaceholder")}
                  className="min-h-[240px] leading-relaxed text-sm lg:text-base"
                  key={`desc-${isbnSearchResult?.description}`}
                  defaultValue={isbnSearchResult?.description || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Wallet className="size-5" />
                  <CardTitle className="text-base">
                    {t("dashboard.products.create.variantPriceTitle")}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600">
                    {t("dashboard.products.create.defaultBadge")}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {t("dashboard.products.create.variantCount", {
                      count: variants.length,
                    })}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 lg:p-6">
              <VariantCreate variants={variants} setVariants={setVariants} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-6 space-y-6">
            <ImagePreviewCard
              imageUrl={isbnSearchResult?.coverImageUrl || ""}
            />

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

            {/* Chỉ là gợi ý UI để “đỡ quên” - không ảnh hưởng logic */}
            <div className="rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{t("dashboard.products.create.creationStatus")}</span>
                <Badge variant="outline" className="text-xs">
                  Draft
                </Badge>
              </div>
              <p className="mt-2 leading-relaxed">
                {t("dashboard.products.create.creationStatusDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
