"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { AdminBookVariant } from "@/types/response/admin.response";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface VariantItemProps {
  v: AdminBookVariant;
  setVariants: (variants: AdminBookVariant[]) => void;
  variants: AdminBookVariant[];
}

export default function VariantItem({
  v,
  setVariants,
  variants,
}: VariantItemProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-300 hover:shadow">
      <div className="flex min-w-0 items-center gap-4">
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
          {v.format}
        </Badge>

        <div className="min-w-0 space-y-0.5">
          <p className="truncate text-sm font-bold">
            Gia ban: {v.price} {v.currencyCode} - Gia nhap: {v.costPrice} {v.currencyCode}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            ISBN: {v.isbn} • {t("dashboard.products.create.variant.stockShort")}: {v.stock}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 rounded-lg hover:bg-red-50"
        onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
      >
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  );
}
