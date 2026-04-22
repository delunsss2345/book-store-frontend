"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeaderCreate({
  onSaveHandler,
  isSaving,
}: {
  onSaveHandler: () => void;
  isSaving: boolean;
}) {
  const t = useTranslations();

  return (
    <div className="sticky top-3 z-20 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="h-6 bg-zinc-50 text-[10px] uppercase tracking-wide">
              Admin / Books
            </Badge>
            <Badge className="h-6 bg-indigo-600 px-2 text-[10px] uppercase tracking-wide hover:bg-indigo-600">
              Create flow
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("dashboard.products.create.header.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.products.create.header.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-xl border-zinc-300">
            <X className="size-4" />
            {t("dashboard.products.create.header.cancel")}
          </Button>
          <Button
            onClick={onSaveHandler}
            disabled={isSaving}
            className="min-w-[140px] gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {t("dashboard.products.create.header.save")}
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-zinc-500">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5">
          1. Scan ISBN
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5">
          2. Fill content
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5">
          3. Save draft
        </div>
      </div>
    </div>
  );
}
