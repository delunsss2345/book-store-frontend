"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useTranslator from "@/hooks/use-translator";
import { cn } from "@/lib/utils";

interface HeaderEditProps {
  detail: { id: string | number };
  defaultTranslation?: { title?: string };
  handleSave: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
}

export default function HeaderEdit({
  detail,
  defaultTranslation,
  handleSave,
  onDelete,
  isSaving = false,
}: HeaderEditProps) {
  const { t } = useTranslator();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9 shrink-0 rounded-full border hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight truncate sm:text-xl">
                {t("dashboard_products.edit.editing")}:{" "}
                <span className="text-muted-foreground font-normal">
                  {defaultTranslation?.title || "Untitled Book"}
                </span>
              </h1>
              <Badge
                variant="secondary"
                className="hidden font-mono text-[10px] sm:inline-flex"
              >
                ID: {detail.id}
              </Badge>
            </div>
            <p className="text-[12px] text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Delete Button - Only icon on mobile to save space */}
          <Button
            variant="outline"
            onClick={onDelete}
            className="group h-9 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30"
          >
            <Trash2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {t("dashboard_products.edit.deleteBook")}
            </span>
          </Button>

          <Separator
            orientation="vertical"
            className="mx-1 h-6 hidden md:block"
          />

          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hidden sm:inline-flex h-9"
          >
            {t("dashboard_products.edit.cancel")}
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-9 px-6 shadow-sm shadow-primary/20 transition-all hover:shadow-md"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isSaving
              ? t("common.saving")
              : t("dashboard_products.edit.updateChanges")}
          </Button>
        </div>
      </div>
    </header>
  );
}
