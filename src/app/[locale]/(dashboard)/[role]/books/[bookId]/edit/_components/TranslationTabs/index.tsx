"use client";

import { Check, Copy, Languages } from "lucide-react";
import { useMemo } from "react";

import { useAdminStore } from "@/features/admin";
import { useLanguagesQuery } from "@/features/language/hooks/use-languages-query";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { LanguageTabsList } from "../LanguageTab";

export function TranslationTabs() {
  const { data: languages, isPending: isPendingLanguages } =
    useLanguagesQuery();

  const { bookDraft, updateTranslationDraft } = useAdminStore();
  const translations = useMemo(() => {
    return bookDraft?.translation;
  }, [bookDraft]);

  if (isPendingLanguages) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
          <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
        </div>
        <div className="h-[400px] w-full animate-pulse rounded-2xl bg-muted/50" />
      </div>
    );
  }

  if (!translations || translations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center bg-muted/10">
        <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Languages className="text-muted-foreground h-7 w-7" />
        </div>
        <h3 className="text-lg font-semibold">Chưa có bản dịch</h3>
        <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
          Vui lòng thêm ngôn ngữ cho sách để bắt đầu chỉnh sửa nội dung.
        </p>
      </div>
    );
  }
  if (!languages) return null;
  const defaultTab = String(translations[0]?.languageId);

  return (
    <Tabs defaultValue={defaultTab} className="w-full space-y-6">
      <LanguageTabsList
        languages={languages}
        isPendingLanguages={isPendingLanguages}
      />
      {translations.map((translation) => {
        const meta = languages?.find(
          (lang) => Number(lang.id) === Number(translation.languageId),
        );
        return (
          <TabsContent
            key={translation.id}
            value={String(translation.languageId)}
            className="mt-0 ring-offset-background focus-visible:outline-none"
          >
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              {/* Content Header */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    {meta?.name}
                    {translation.title && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Chỉnh sửa nội dung hiển thị cho thị trường {meta?.name}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 font-mono uppercase text-[10px]"
                >
                  {meta?.code}
                </Badge>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6">
                {/* Title */}
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    Tiêu đề sách <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="VD: Harry Potter và Hòn đá Phù thủy"
                    value={translation.title}
                    onChange={(e) =>
                      updateTranslationDraft(
                        translation.languageId,
                        "title",
                        e.target.value,
                      )
                    }
                    className="h-12 border-muted-foreground/20 focus-visible:ring-indigo-500 transition-all shadow-sm text-base"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold">
                    Đường dẫn (Slug)
                  </Label>
                  <div className="relative group">
                    <Input
                      disabled
                      value={translation.slug}
                      className="h-11 bg-muted/40 pr-12 font-mono text-xs opacity-80"
                      placeholder="harry-potter-slug"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-background"
                    >
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold">
                    Mô tả chi tiết
                  </Label>
                  <Textarea
                    placeholder="Mô tả nội dung cuốn sách để người đọc dễ dàng nắm bắt..."
                    className="min-h-[240px] resize-none leading-relaxed border-muted-foreground/20 focus-visible:ring-indigo-500 shadow-sm"
                    value={translation.description}
                    onChange={(e) =>
                      updateTranslationDraft(
                        translation.languageId,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                  <div className="flex justify-between items-center px-1">
                    <p className="text-[11px] text-muted-foreground italic">
                      * Tự động lưu bản nháp
                    </p>
                    <span className="text-[11px] font-medium opacity-60 uppercase">
                      {translation.description?.length || 0} ký tự
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
