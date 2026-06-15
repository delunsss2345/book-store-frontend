"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Translator = ReturnType<typeof useTranslations>;

export function ProductsPagination({ t }: { t: Translator }) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 px-6 py-4 md:flex-row text-sm text-muted-foreground">
      <p>
        {t("dashboard.products.pagination.summary", {
          perPage: 8,
          total: 128,
        })}
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft className="size-4" />
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "ghost"}
              className={`h-8 w-8 p-0 ${page === 1 ? "bg-slate-950 shadow-sm" : ""}`}
            >
              {page}
            </Button>
          ))}
          <span className="px-1">...</span>
          <Button variant="ghost" className="h-8 w-8 p-0">
            12
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-4 border-l pl-4">
          <span className="whitespace-nowrap">Go to</span>
          <Input defaultValue="1" className="h-8 w-12 text-center text-xs" />
        </div>
      </div>
    </div>
  );
}
