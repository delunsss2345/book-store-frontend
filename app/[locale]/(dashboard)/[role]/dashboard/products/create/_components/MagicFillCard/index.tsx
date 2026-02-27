"use client";

import { Sparkles, Hash, Search, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const MagicFillCard = ({
  onScan,
  isPending,
}: {
  onScan: (isbn: string, lang: string) => void;
  isPending: boolean;
}) => {
  const t = useTranslations();
  const [isbn, setIsbn] = useState("");
  const [lang, setLang] = useState("vi");

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-none border-2 border-dashed">
      <CardContent className="p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <Label className="text-primary font-bold flex items-center gap-2">
              <Sparkles className="size-4" />{" "}
              {t("dashboard.products.create.magicFill.title")}
            </Label>

            {isPending && (
              <span className="text-xs text-muted-foreground">
                {t("dashboard.products.create.magicFill.scanning")}
              </span>
            )}
          </div>

          <div className="rounded-xl border bg-background p-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch">
              <div className="w-full md:w-[190px]">
                <Select
                  defaultValue="vi"
                  onValueChange={(v) => setLang(v)}
                  disabled={isPending}
                >
                  <SelectTrigger className="h-12 bg-white border-primary/10">
                    <Languages className="size-4 mr-2 text-muted-foreground" />
                    <SelectValue
                      placeholder={t("dashboard.products.create.magicFill.languagePlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">
                      {t("dashboard.products.create.magicFill.languageVietnamese")}
                    </SelectItem>
                    <SelectItem value="en">
                      {t("dashboard.products.create.magicFill.languageEnglish")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  disabled={isPending}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder={t("dashboard.products.create.magicFill.isbnPlaceholder")}
                  className="pl-10 h-12 bg-white text-base lg:text-lg font-mono shadow-sm"
                />
              </div>

              <Button
                disabled={isPending}
                onClick={() => onScan(isbn, lang)}
                size="lg"
                className="h-12 px-8 shadow-md group"
              >
                <Search className="size-4 mr-2 group-hover:scale-110 transition-transform" />
                {t("dashboard.products.create.magicFill.scanButton")}
              </Button>
            </div>

            <div className="mt-3 text-[11px] text-muted-foreground">
              {t("dashboard.products.create.magicFill.hint")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
