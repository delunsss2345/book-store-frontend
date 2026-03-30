"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Save,
  Sparkles,
  ImageIcon,
  Languages,
  Wallet,
  Ruler,
  Trash2,
  Plus,
  ExternalLink,
  Copy,
  CheckCircle2,
  Globe,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTranslator from "@/hooks/use-translator";
import { useAdminStore } from "@/features/admin";
import { LoadingLazy } from "@/components/common/LoadingLazy";

export default function EditBookPage() {
  const router = useRouter();
  const { t } = useTranslator();

  // Lấy bookEdit từ store
  const { bookEdit } = useAdminStore();

  // Nếu chưa có dữ liệu, có thể hiển thị loading hoặc return null
  if (!bookEdit) return <LoadingLazy />;

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* 1. TOP BAR: Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full shrink-0"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {t("dashboard_products.edit.editing")}:{" "}
                {bookEdit.translation?.title}
              </h1>
              <Badge variant="outline" className="font-mono text-[10px]">
                ID: {bookEdit.id}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="size-3" /> https://yourshop.com/books/
                {bookEdit.translation?.slug}
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-primary gap-1"
              >
                <ExternalLink className="size-3" />{" "}
                {t("dashboard_products.edit.viewLive")}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/5 border-destructive/20 gap-2"
          >
            <Trash2 className="size-4" />{" "}
            {t("dashboard_products.edit.deleteBook")}
          </Button>
          <Separator
            orientation="vertical"
            className="h-8 mx-2 hidden md:block"
          />
          <Button variant="ghost" onClick={() => router.back()}>
            {t("dashboard_products.edit.cancel")}
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 px-8 gap-2 shadow-lg shadow-slate-200">
            <Save className="size-4" />{" "}
            {t("dashboard_products.edit.updateChanges")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Data */}
        <div className="lg:col-span-8 space-y-8">
          {/* TRANSLATION SECTION */}
          <Card className="shadow-sm overflow-hidden border-indigo-100">
            <CardHeader className="border-b bg-indigo-50/30 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2 text-indigo-700">
                <Languages className="size-5" />
                <CardTitle className="text-lg">
                  {t("dashboard_products.edit.translationContent")}
                </CardTitle>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="bg-white border-indigo-200 text-indigo-600 gap-2"
              >
                <Sparkles className="size-3.5" />{" "}
                {t("dashboard_products.edit.aiRewrite")}
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold">
                    {t("dashboard_products.edit.bookTitle")}
                  </Label>
                  <Input
                    defaultValue={bookEdit.translation?.title}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-muted-foreground">
                    {t("dashboard_products.edit.slug")}
                  </Label>
                  <div className="relative">
                    <Input
                      defaultValue={bookEdit.translation?.slug}
                      className="h-11 pr-10 font-mono text-sm bg-slate-50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold">
                  {t("dashboard_products.edit.description")}
                </Label>
                <Textarea
                  className="min-h-[300px] leading-relaxed"
                  defaultValue={bookEdit.translation?.description}
                />
              </div>
            </CardContent>
          </Card>

          {/* VARIANTS MANAGEMENT */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2 text-emerald-700">
                <Wallet className="size-5" />
                <CardTitle className="text-lg">
                  {t("dashboard_products.edit.variantsTitle")}
                </CardTitle>
              </div>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                <Plus className="size-4" />{" "}
                {t("dashboard_products.edit.addFormat")}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="w-[120px]">
                      {t("dashboard_products.edit.table.format")}
                    </TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">
                      {t("dashboard_products.edit.table.costPrice")}
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      {t("dashboard_products.edit.table.price")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("dashboard_products.edit.table.stock")}
                    </TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookEdit.variants.map((variant) => (
                    <TableRow key={variant.id} className="group">
                      <TableCell className="font-bold">
                        <Badge variant="secondary">{variant.format}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {variant.isbn}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {Number(variant.costPrice).toLocaleString()}{" "}
                        {variant.currencyCode}
                      </TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">
                        {Number(variant.price).toLocaleString()}{" "}
                        {variant.currencyCode}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">
                          {variant.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* STATUS CARD */}
          <Card className="shadow-sm border-2 border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold italic">
                    {t("dashboard_products.edit.releaseStatus")}
                  </Label>
                  <p className="text-xs text-muted-foreground italic">
                    {t("dashboard_products.edit.releaseStatusDescription")}
                  </p>
                </div>
                <Switch
                  defaultChecked={bookEdit.isActive}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground italic">
                <CheckCircle2 className="size-3 text-emerald-500" />{" "}
                {t("dashboard_products.edit.lastUpdated")}:{" "}
                {new Date(bookEdit.updatedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* COVER PREVIEW */}
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="py-3 bg-slate-50 border-b">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("dashboard_products.edit.currentCover")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden shadow-inner border group relative">
                <img
                  src={bookEdit.coverImageUrl}
                  className="w-full h-full object-cover"
                  alt="Current cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <ImageIcon className="size-4" />{" "}
                    {t("dashboard_products.edit.changeImage")}
                  </Button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  {t("dashboard_products.edit.originalImageUrl")}
                </Label>
                <Input
                  className="h-8 text-[11px] font-mono bg-slate-50"
                  defaultValue={bookEdit.coverImageUrl}
                />
              </div>
            </CardContent>
          </Card>

          {/* PHYSICAL SPECS */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 bg-slate-50 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("dashboard_products.edit.specifications")}
              </CardTitle>
              <Ruler className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.weight")} (g)
                  </Label>
                  <Input
                    type="number"
                    className="h-9 font-bold"
                    defaultValue={bookEdit.weightGrams}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.pageCount")}
                  </Label>
                  <Input
                    type="number"
                    className="h-9"
                    defaultValue={bookEdit.pageCount}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    {t("dashboard_products.edit.publisher")} (ID)
                  </Label>
                  <Select defaultValue={String(bookEdit.publisherId)}>
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
                    defaultValue={bookEdit.publicationYear}
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
