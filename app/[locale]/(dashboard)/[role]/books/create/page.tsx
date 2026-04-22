"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookOpenText, Languages, Tag, Wallet } from "lucide-react";
import { useState } from "react";

import { useCreateBookAllMutation } from "@/features/admin/hooks/use-create-book-all";
import { useCategoryQuery } from "@/features/category/hooks/use-category-query";
import { useSearchIsbnMutation } from "@/features/search/hooks/use-search-isbn";
import { useSearchStore } from "@/features/search/store/search.store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { AdminBookVariant } from "@/types/response/admin.response";
import { convertIsbnResultToBookSchema } from "@/utils/convert-book";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import HeaderCreate from "./_components/HeaderCreate";
import { ImagePreviewCard } from "./_components/ImagePreviewCard";
import { MagicFillCard } from "./_components/MagicFillCard";
import { PhysicalSpecsCard } from "./_components/PhysicalSpecsCard";
import VariantCreate from "./_components/VariantCreate";

export default function CreateBookPage() {
  const t = useTranslations();
  const [variants, setVariants] = useState<AdminBookVariant[]>([]);
  const [language, setLanguage] = useState<string>("vi");
  const [categoryId, setCategoryId] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("");

  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierQuery();
  const suppliers = supplierData?.items || [];

  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryQuery({
    limit: 100,
    isActive: true,
  });
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
    <div className="mx-auto w-full max-w-[1400px] space-y-5 p-4 lg:p-6">
      <HeaderCreate
        onSaveHandler={onSaveHandler}
        isSaving={createBookAllPending}
      />

      <MagicFillCard onScan={onScanHandler} isPending={searchIsbnPending} />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <Card className="overflow-hidden border-zinc-200 shadow-sm">
            <CardHeader className="border-b bg-zinc-50/80 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-indigo-700">
                  <BookOpenText className="size-4" />
                  <CardTitle className="text-base font-bold">
                    {t("dashboard.products.create.contentTitle")}
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-[10px] font-medium uppercase tracking-wide">
                    {language === "vi"
                      ? t("dashboard.products.create.languageVietnamese")
                      : t("dashboard.products.create.languageEnglish")}
                  </Badge>
                </div>

                {!!isbnSearchResult && (
                  <Badge className="h-6 bg-emerald-600 px-2 text-[10px] uppercase tracking-wide hover:bg-emerald-600">
                    {t("dashboard.products.create.loadedData")}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-5">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700">
                  {t("dashboard.products.create.bookTitleLabel")}
                </Label>
                <Input
                  placeholder={t("dashboard.products.create.bookTitlePlaceholder")}
                  className="h-11 rounded-xl border-zinc-300 bg-white text-sm"
                  key={`title-${isbnSearchResult?.title}`}
                  defaultValue={isbnSearchResult?.title || ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700">
                  {t("dashboard.products.create.descriptionLabel")}
                </Label>
                <Textarea
                  placeholder={t("dashboard.products.create.descriptionPlaceholder")}
                  className="min-h-36 resize-y rounded-xl border-zinc-300 bg-white text-sm leading-relaxed"
                  key={`desc-${isbnSearchResult?.description}`}
                  defaultValue={isbnSearchResult?.description || ""}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-emerald-200 shadow-sm">
            <CardHeader className="border-b bg-emerald-50/70 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Wallet className="size-4" />
                  <CardTitle className="text-base font-bold">
                    {t("dashboard.products.create.variantPriceTitle")}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="h-6 bg-emerald-700 px-2 text-[10px] uppercase tracking-wide hover:bg-emerald-700">
                    {t("dashboard.products.create.defaultBadge")}
                  </Badge>
                  <Badge variant="outline" className="h-6 bg-white px-2 text-[10px] uppercase tracking-wide">
                    {t("dashboard.products.create.variantCount", {
                      count: variants?.length ?? 0,
                    })}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5">
              <VariantCreate variants={variants} setVariants={setVariants} />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-5">
          <ImagePreviewCard imageUrl={isbnSearchResult?.coverImageUrl || ""} />

          <Card className="overflow-hidden border-amber-200 shadow-sm">
            <CardHeader className="border-b bg-amber-50/70 px-5 py-4">
              <div className="flex items-center gap-2 text-amber-800">
                <Tag className="size-4" />
                <CardTitle className="text-base font-bold tracking-tight">
                  Phan loai / Metadata
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700">
                  Danh muc (Category)
                </Label>
                <Select
                  value={categoryId}
                  onValueChange={setCategoryId}
                  disabled={isCategoryLoading}
                >
                  <SelectTrigger className="h-11 rounded-xl border-zinc-300 bg-white text-sm">
                    <SelectValue placeholder="Chon danh muc..." />
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

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700">
                  Nha cung cap (Supplier)
                </Label>
                <Select
                  value={supplierId}
                  onValueChange={setSupplierId}
                  disabled={isSupplierLoading}
                >
                  <SelectTrigger className="h-11 rounded-xl border-zinc-300 bg-white text-sm">
                    <SelectValue placeholder="Chon nha cung cap..." />
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

          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Languages className="size-4 text-zinc-500" />
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  {t("dashboard.products.create.creationStatus")}
                </span>
              </div>
              <Badge variant="outline" className="h-6 bg-white px-2 text-[10px] uppercase tracking-wide">
                Draft
              </Badge>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              {t("dashboard.products.create.creationStatusDescription")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
