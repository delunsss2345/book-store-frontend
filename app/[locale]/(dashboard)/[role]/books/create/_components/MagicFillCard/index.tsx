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
    <Card className="border-primary/15 bg-primary/[0.03] shadow-none border border-dashed text-sm">
      <CardContent className="p-2.5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-primary font-semibold text-xs flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              {t("dashboard.products.create.magicFill.title")}
            </Label>

            {isPending && (
              <span className="text-[10px] text-muted-foreground font-medium">
                {t("dashboard.products.create.magicFill.scanning")}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <div className="w-full sm:w-[130px]">
              <Select value={lang} onValueChange={setLang} disabled={isPending}>
                <SelectTrigger className="h-7 px-2 bg-white border-primary/10 text-xs shadow-sm">
                  <Languages className="size-3 mr-1.5 text-muted-foreground" />
                  <SelectValue
                    placeholder={t(
                      "dashboard.products.create.magicFill.languagePlaceholder",
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi" className="text-xs">
                    {t(
                      "dashboard.products.create.magicFill.languageVietnamese",
                    )}
                  </SelectItem>
                  <SelectItem value="en" className="text-xs">
                    {t("dashboard.products.create.magicFill.languageEnglish")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1">
              <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <Input
                value={isbn}
                disabled={isPending}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder={t(
                  "dashboard.products.create.magicFill.isbnPlaceholder",
                )}
                className="pl-7 h-7 bg-white text-xs font-mono shadow-sm"
              />
            </div>

            <Button
              disabled={isPending || !isbn.trim()}
              onClick={() => onScan(isbn.trim(), lang)}
              size="sm"
              className="h-7 px-3 shadow-none group"
            >
              <Search className="size-3 mr-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs">
                {t("dashboard.products.create.magicFill.scanButton")}
              </span>
            </Button>
          </div>

          <div className="text-[9px] leading-relaxed text-muted-foreground mt-0.5">
            {t("dashboard.products.create.magicFill.hint")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
