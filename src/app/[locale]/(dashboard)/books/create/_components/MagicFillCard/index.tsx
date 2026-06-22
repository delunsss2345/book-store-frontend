"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Hash, Languages, Search, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/40 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              <Sparkles className="size-3.5" />
              {t("dashboard.products.create.magicFill.title")}
            </Label>

            {isPending && (
              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-muted-foreground">
                {t("dashboard.products.create.magicFill.scanning")}
              </span>
            )}
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-center">
            <div>
              <Select value={lang} onValueChange={setLang} disabled={isPending}>
                <SelectTrigger className="h-10 rounded-xl border-indigo-200 bg-white text-xs shadow-sm">
                  <Languages className="mr-1.5 size-3 text-muted-foreground" />
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
              <Hash className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={isbn}
                disabled={isPending}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder={t(
                  "dashboard.products.create.magicFill.isbnPlaceholder",
                )}
                className="h-10 rounded-xl border-indigo-200 bg-white pl-8 text-xs font-mono shadow-sm"
              />
            </div>

            <Button
              disabled={isPending || !isbn.trim()}
              onClick={() => onScan(isbn.trim(), lang)}
              className="h-10 rounded-xl bg-indigo-600 px-4 shadow-none transition-all hover:bg-indigo-700"
            >
              <Search className="mr-1.5 size-3 transition-transform group-hover:scale-110" />
              <span className="text-xs">
                {t("dashboard.products.create.magicFill.scanButton")}
              </span>
            </Button>
          </div>

          <div className="rounded-xl border border-dashed border-indigo-200 bg-white/80 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            {t("dashboard.products.create.magicFill.hint")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
