"use client";

import { Globe, Layers, Settings2 } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LanguageItemData } from "@/types/response/language.response";
import { ModalType, useModalStore } from "@/features/modal";
import { Button } from "@/components/ui/button";

export function LanguageTabsList({
  languages,
  isPendingLanguages,
}: {
  languages: LanguageItemData[];
  isPendingLanguages: boolean;
}) {
  const { onOpen } = useModalStore();
  if (isPendingLanguages) {
    return (
      <div className="flex h-10 w-full max-w-75 animate-pulse rounded-lg bg-muted/50" />
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <TabsList>
        {languages?.map((lang) => (
          <TabsTrigger
            key={lang.id}
            value={lang.id}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300",
              "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md",
              "text-muted-foreground font-medium hover:text-foreground",
            )}
          >
            <Globe className="h-3.5 w-3.5 opacity-70" />
            <span className="text-sm">{lang.name}</span>
            <span className="text-[10px] opacity-40 font-mono uppercase ml-1">
              {lang.code}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/20 p-2">
        <Button
          variant="ghost"
          onClick={() => onOpen(ModalType.SHOW_VARIANT_EDIT)}
          className="cursor-pointer h-10 rounded-xl px-4 font-medium text-foreground transition-colors hover:bg-background"
        >
          <Layers className="size-4" />
          <span>Quản lý Variants</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => onOpen(ModalType.SHOW_BOOK_SPECIFICATIONS_EDIT)}
          className="cursor-pointer h-10 rounded-xl px-4 font-medium text-foreground transition-colors hover:bg-background"
        >
          <Settings2 className="size-4" />
          <span>Thông số kỹ thuật</span>
        </Button>
      </div>
    </div>
  );
}
