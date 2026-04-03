"use client";

import { AdminBookVariant } from "@/types/response/admin.response";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center justify-between gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow transition-shadow">
      <div className="flex gap-4 items-center min-w-0">
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
          {v.format}
        </Badge>

        <div className="min-w-0">
          <p className="text-sm font-bold truncate">
            Giá bán: {v.price} {v.currencyCode} - Giá nhập: {v.costPrice} {v.currencyCode}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            ISBN: {v.isbn} • {t("dashboard.products.create.variant.stockShort")}: {v.stock}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 hover:bg-red-50"
        onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
      >
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  );
}
