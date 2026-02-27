"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Plus,
  Search,
  Hash,
  Wallet,
  Tag,
  Package,
  Layers,
  BookType,
  Globe,
  CheckCircle2,
  Loader2,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalAddVariant({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const [isSearching, setIsSearching] = useState(false);
  const [hasData, setHasData] = useState(false);

  // Giả lập tìm kiếm ISBN
  const handleIsbnSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasData(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 py-2">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 shadow-sm">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {t("modal.addVariant.title")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("modal.addVariant.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* 2. ISBN Quick Access */}
      <Card className="p-1.5 border-2 border-dashed bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("modal.addVariant.isbnPlaceholder")}
              className="pl-9 bg-background border-none focus-visible:ring-0 shadow-none"
            />
          </div>
          <Button
            size="sm"
            onClick={handleIsbnSearch}
            disabled={isSearching}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {t("modal.addVariant.checkCodeButton")}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CỘT TRÁI: ĐỊNH DẠNG & PHIÊN BẢN */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <BookType className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {t("modal.addVariant.printInfo")}
            </span>
          </div>

          <div className="space-y-2">
            <Label>{t("modal.addVariant.bookFormatLabel")}</Label>
            <Select defaultValue={hasData ? "PAPERBACK" : undefined}>
              <SelectTrigger>
                <SelectValue placeholder={t("modal.addVariant.bookFormatPlaceholder")} />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="PAPERBACK">{t("modal.addVariant.formats.paperback")}</SelectItem>
                <SelectItem value="HARDCOVER">{t("modal.addVariant.formats.hardcover")}</SelectItem>
                <SelectItem value="EBOOK">{t("modal.addVariant.formats.ebook")}</SelectItem>
                <SelectItem value="AUDIOBOOK">{t("modal.addVariant.formats.audiobook")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" /> {t("modal.addVariant.editionLabel")}
              </Label>
              <Input
                type="number"
                placeholder={t("modal.addVariant.editionPlaceholder")}
                defaultValue={hasData ? "2" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5" /> {t("modal.addVariant.stockLabel")}
              </Label>
              <Input type="number" placeholder="0" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900">
            <div className="space-y-0.5">
              <Label className="text-emerald-700 dark:text-emerald-400 font-bold">
                {t("modal.addVariant.releaseStatus")}
              </Label>
              <p className="text-[11px] text-emerald-600/70">
                {t("modal.addVariant.releaseStatusDescription")}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        {/* CỘT PHẢI: GIÁ CẢ & TIỀN TỆ */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <CircleDollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {t("modal.addVariant.financeAndIsbn")}
            </span>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              {t("modal.addVariant.officialIsbnLabel")}
            </Label>
            <Input
              placeholder="978..."
              defaultValue={hasData ? "9786043312345" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("modal.addVariant.costPriceLabel")}</Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="number" className="pl-9" placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("modal.addVariant.listPriceLabel")}</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <Input
                type="number"
                className="pl-9 border-emerald-200 focus:border-emerald-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> {t("modal.addVariant.currencyLabel")}
            </Label>
            <Select defaultValue="VND">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VND">{t("modal.addVariant.currencies.vnd")}</SelectItem>
                <SelectItem value="USD">{t("modal.addVariant.currencies.usd")}</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 3. Footer Action */}
      <div className="flex gap-3 pt-4">
        <Button variant="ghost" className="flex-1" onClick={onClose}>
          {t("modal.addVariant.cancelButton")}
        </Button>
        <Button className="flex-[2] bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none">
          {t("modal.addVariant.confirmButton")}
        </Button>
      </div>
    </div>
  );
}
