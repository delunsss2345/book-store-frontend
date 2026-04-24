"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { BookMarked, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslator from "@/hooks/use-translator";

export const EmptyLibrary = () => {
  const { t } = useTranslator();
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/60 ring-1 ring-border/40">
        <BookMarked className="h-9 w-9 text-muted-foreground/50" />
      </div>
      <div className="max-w-xs space-y-1.5">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("library.empty.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("library.empty.description")}
        </p>
      </div>
      <Button asChild size="sm" className="mt-2">
        <Link href={`/${locale}`}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          {t("library.empty.cta")}
        </Link>
      </Button>
    </div>
  );
};
