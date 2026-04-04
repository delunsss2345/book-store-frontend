"use client";

import { Globe } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LanguageItemData } from "@/types/response/language.response";

export function LanguageTabsList({
  languages,
  isPendingLanguages,
}: {
  languages: LanguageItemData[];
  isPendingLanguages: boolean;
}) {
  if (isPendingLanguages) {
    return (
      <div className="flex h-10 w-full max-w-75 animate-pulse rounded-lg bg-muted/50" />
    );
  }

  return (
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
  );
}
