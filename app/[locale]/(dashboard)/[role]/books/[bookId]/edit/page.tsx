"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Save,
  ImageIcon,
  Languages,
  Wallet,
  Ruler,
  Trash2,
  Copy,
  CheckCircle2,
  Lock,
  PencilLine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useTranslator from "@/hooks/use-translator";
import { useAdminBookQuery, useUpdateBookMutation } from "@/features/admin";
import { LoadingLazy } from "@/components/common/LoadingLazy";
import { BookVariant } from "@/types/response/catalog.response";
import {
  AdminBookDetail,
  UpdateAdminBookPayload,
} from "@/types/request/admin.request";
import { useLanguagesQuery } from "@/features/language/hooks/use-languages-query";
import { LanguagePicker } from "./_components/LanguageTab";
import HeaderEdit from "./_components/HeaderEdit";
import { TranslationTabs } from "./_components/TranslationTabs";

export type AdminBookGeneralForm = {
  isActive: boolean;
  coverImageUrl: string;
  weightGrams: number;
  pageCount: number;
  publisherId: string;
  publicationYear: number;
};

export type AdminBookTranslationDraft = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

export type AdminBookVariantDraft = {
  id: string;
  format: BookVariant;
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};

export type AdminBookEditStore = {
  general: AdminBookGeneralForm;
  translations: AdminBookTranslationDraft[];
  variants: AdminBookVariantDraft[];
};

const EMPTY_GENERAL_FORM: AdminBookGeneralForm = {
  isActive: false,
  coverImageUrl: "",
  weightGrams: 0,
  pageCount: 0,
  publisherId: "",
  publicationYear: new Date().getFullYear(),
};

function formatCurrency(value: string | number, currencyCode: string) {
  return `${Number(value || 0).toLocaleString()} ${currencyCode}`;
}

function toAdminBookEditStore(detail: AdminBookDetail): AdminBookEditStore {
  return {
    general: {
      isActive: detail.isActive,
      coverImageUrl: detail.coverImageUrl,
      weightGrams: detail.weightGrams,
      pageCount: detail.pageCount,
      publisherId: detail.publisherId,
      publicationYear: detail.publicationYear,
    },
    translations: detail.translation.map((item) => ({
      id: item.id,
      languageId: item.languageId,
      title: item.title,
      description: item.description,
      slug: item.slug,
    })),
    variants: detail.variants.map((item) => ({
      id: item.id,
      format: item.format,
      edition: item.edition,
      isbn: item.isbn,
      costPrice: item.costPrice,
      price: item.price,
      currencyCode: item.currencyCode,
      stock: item.stock,
      isActive: item.isActive,
    })),
  };
}

export default function EditBookPage() {
  const router = useRouter();
  const { t } = useTranslator();
  const { bookId } = useParams<{ bookId: string }>();

  const { data: bookDetail, isLoading } = useAdminBookQuery(bookId);
  const { data: languages, isPending: isPendingLanguages } =
    useLanguagesQuery();

  const { mutateAsync: updateBook } = useUpdateBookMutation();

  const detail = bookDetail as AdminBookDetail | undefined;

  const [generalForm, setGeneralForm] =
    useState<AdminBookGeneralForm>(EMPTY_GENERAL_FORM);
  const [translationDrafts, setTranslationDrafts] = useState<
    AdminBookTranslationDraft[]
  >([]);
  const [variantDrafts, setVariantDrafts] = useState<AdminBookVariantDraft[]>(
    [],
  );

  useEffect(() => {
    if (!detail) return;

    const store = toAdminBookEditStore(detail);
    setGeneralForm(store.general);
    setTranslationDrafts(store.translations);
    setVariantDrafts(store.variants);
  }, [detail]);

  const defaultTranslation = useMemo(() => {
    return translationDrafts[0] ?? detail?.translation?.[0];
  }, [translationDrafts, detail]);

  const updateTranslationField = (
    translationId: string,
    field: keyof Pick<
      AdminBookTranslationDraft,
      "title" | "slug" | "description"
    >,
    value: string,
  ) => {
    setTranslationDrafts((prev) =>
      prev.map((item) =>
        item.id === translationId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const updateVariantPrice = (variantId: string, value: string) => {
    const normalized = value.replace(/[^\d]/g, "");

    setVariantDrafts((prev) =>
      prev.map((item) =>
        item.id === variantId ? { ...item, price: normalized } : item,
      ),
    );
  };

  const handleSave = async () => {
    if (!detail) return;

    const payload: UpdateAdminBookPayload = {
      id: detail.id,
      isActive: generalForm.isActive,
      coverImageUrl: generalForm.coverImageUrl,
      weightGrams: Number(generalForm.weightGrams),
      pageCount: Number(generalForm.pageCount),
      publisherId: Number(generalForm.publisherId),
      publicationYear: Number(generalForm.publicationYear),
      translations: translationDrafts.map((item) => ({
        code: getLanguageCodeById(item.languageId),
        title: item.title,
        description: item.description,
      })),
      variants: variantDrafts.map((item) => ({
        id: item.id,
        price: item.price,
      })),
    };

    await updateBook({ bookId, payload });
  };

  if (!bookId) return <LoadingLazy />;
  if (isLoading && !detail) return <LoadingLazy />;
  if (!detail) return <LoadingLazy />;

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-4">
      <HeaderEdit
        detail={detail}
        defaultTranslation={defaultTranslation}
        handleSave={handleSave}
        // onDelete={handleDelete}
        // isSaving={isSaving}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <Card className="overflow-hidden border-indigo-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-indigo-50/40">
              <div className="flex items-center gap-2 text-indigo-700">
                <Languages className="size-5" />
                <CardTitle className="text-lg">
                  Nội dung theo ngôn ngữ
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-indigo-100 text-indigo-700"
              >
                {translationDrafts.length} languages
              </Badge>
            </CardHeader>

            <CardContent className="p-6">
              <TranslationTabs
                translationDrafts={translationDrafts}
                languages={languages ?? []}
                // updateTranslationField={updateTranslationField}
              />
            </CardContent>
          </Card>

          <Card className="border-emerald-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-emerald-50/40">
              <div className="flex items-center gap-2 text-emerald-700">
                <Wallet className="size-5" />
                <CardTitle className="text-lg">
                  Giá bán theo từng variant
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-emerald-100 text-emerald-700"
              >
                Chỉ sửa price
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
              {variantDrafts.map((variant) => (
                <div
                  key={variant.id}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="rounded-full px-3 py-1">
                        {variant.format}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Edition {variant.edition} • ISBN{" "}
                        <span className="font-mono">{variant.isbn}</span>
                      </div>
                    </div>

                    <Badge
                      variant={variant.isActive ? "default" : "secondary"}
                      className="w-fit"
                    >
                      {variant.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border bg-muted/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <Lock className="size-3.5" />
                        Cost price
                      </div>
                      <Input
                        value={formatCurrency(
                          variant.costPrice,
                          variant.currencyCode,
                        )}
                        readOnly
                        disabled
                        className="h-11 font-semibold"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Không được chỉnh
                      </p>
                    </div>

                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-emerald-700">
                        <PencilLine className="size-3.5" />
                        Sale price
                      </div>
                      <div className="relative">
                        <Input
                          value={variant.price}
                          onChange={(e) =>
                            updateVariantPrice(variant.id, e.target.value)
                          }
                          inputMode="numeric"
                          className="h-11 border-emerald-300 bg-background pr-14 text-left text-base font-semibold"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                          {variant.currencyCode}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-muted/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <Lock className="size-3.5" />
                        Stock
                      </div>
                      <Input
                        value={String(variant.stock)}
                        readOnly
                        disabled
                        className="h-11 font-semibold"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Chỉ xem, không được chỉnh tồn kho
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 lg:col-span-4">
          <Card className="border-2 border-primary/10 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">
                    {t("dashboard_products.edit.releaseStatus")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard_products.edit.releaseStatusDescription")}
                  </p>
                </div>
                <Switch
                  checked={generalForm.isActive}
                  onCheckedChange={(checked) =>
                    setGeneralForm((prev) => ({ ...prev, isActive: checked }))
                  }
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <CheckCircle2 className="size-3 text-emerald-500" />
                {t("dashboard_products.edit.lastUpdated")}:{" "}
                {new Date(detail.updatedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="border-b bg-slate-50 py-3">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("dashboard_products.edit.currentCover")}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border bg-slate-100 shadow-inner">
                {/* <img
                  src={generalForm.coverImageUrl}
                  className="h-full w-full object-cover"
                  alt="Current cover"
                /> */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <ImageIcon className="size-4" />
                    {t("dashboard_products.edit.changeImage")}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  {t("dashboard_products.edit.originalImageUrl")}
                </Label>
                <Input
                  className="h-9 text-[11px] font-mono"
                  value={generalForm.coverImageUrl}
                  onChange={(e) =>
                    setGeneralForm((prev) => ({
                      ...prev,
                      coverImageUrl: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50 py-3">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("dashboard_products.edit.specifications")}
              </CardTitle>
              <Ruler className="size-4 text-slate-400" />
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.weight")} (g)
                  </Label>
                  <Input
                    type="number"
                    className="h-9 font-semibold"
                    value={generalForm.weightGrams}
                    onChange={(e) =>
                      setGeneralForm((prev) => ({
                        ...prev,
                        weightGrams: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.pageCount")}
                  </Label>
                  <Input
                    type="number"
                    className="h-9"
                    value={generalForm.pageCount}
                    onChange={(e) =>
                      setGeneralForm((prev) => ({
                        ...prev,
                        pageCount: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.publisher")} (ID)
                  </Label>
                  <Select
                    value={generalForm.publisherId}
                    onValueChange={(value) =>
                      setGeneralForm((prev) => ({
                        ...prev,
                        publisherId: value,
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="8">NXB Trẻ (ID: 8)</SelectItem>
                      <SelectItem value="1">Pearson Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.publicationYear")}
                  </Label>
                  <Input
                    type="number"
                    className="h-9"
                    value={generalForm.publicationYear}
                    onChange={(e) =>
                      setGeneralForm((prev) => ({
                        ...prev,
                        publicationYear: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
