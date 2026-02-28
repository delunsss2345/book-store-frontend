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
    <Card className="border-primary/15 bg-primary/[0.03] shadow-none border border-dashed">
      <CardContent className="p-3">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-primary font-semibold text-sm flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              {t("dashboard.products.create.magicFill.title")}
            </Label>

            {isPending && (
              <span className="text-[11px] text-muted-foreground">
                {t("dashboard.products.create.magicFill.scanning")}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-stretch">
            <div className="w-full md:w-[140px]">
              <Select value={lang} onValueChange={setLang} disabled={isPending}>
                <SelectTrigger className="h-8 px-2.5 bg-white border-primary/10 text-xs">
                  <Languages className="size-3.5 mr-2 text-muted-foreground" />
                  <SelectValue
                    placeholder={t(
                      "dashboard.products.create.magicFill.languagePlaceholder",
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">
                    {t(
                      "dashboard.products.create.magicFill.languageVietnamese",
                    )}
                  </SelectItem>
                  <SelectItem value="en">
                    {t("dashboard.products.create.magicFill.languageEnglish")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1">
              <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                value={isbn}
                disabled={isPending}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder={t(
                  "dashboard.products.create.magicFill.isbnPlaceholder",
                )}
                className="pl-8 h-8 bg-white text-xs font-mono shadow-none"
              />
            </div>

            <Button
              disabled={isPending || !isbn.trim()}
              onClick={() => onScan(isbn.trim(), lang)}
              size="sm"
              className="h-8 px-3.5 shadow-none group"
            >
              <Search className="size-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs">
                {t("dashboard.products.create.magicFill.scanButton")}
              </span>
            </Button>
          </div>

          <div className="text-[10px] leading-4 text-muted-foreground">
            {t("dashboard.products.create.magicFill.hint")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
