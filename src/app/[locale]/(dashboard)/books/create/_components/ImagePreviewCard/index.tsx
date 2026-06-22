"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ImageIcon, Link as LinkIcon, RefreshCw, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ImagePreviewCardProps {
  imageUrl?: string;
  onUrlChange?: (url: string) => void;
  onRemove?: () => void;
}

export const ImagePreviewCard = ({
  imageUrl,
  onUrlChange,
  onRemove,
}: ImagePreviewCardProps) => {
  const t = useTranslations();
  const hasImage = imageUrl && imageUrl.trim() !== "";

  return (
    <Card className="overflow-hidden border-zinc-200 shadow-sm">
      <CardHeader className="border-b bg-zinc-50/80 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-slate-500" />
            <CardTitle className="text-base font-bold tracking-tight text-slate-700">
              {t("dashboard.products.create.imagePreview.title")}
            </CardTitle>
          </div>

          {hasImage && (
            <Badge variant="secondary" className="text-[10px] font-normal">
              Live Preview
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {/* Preview */}
        <div className="rounded-xl border bg-background p-2">
          <div className="group relative mx-auto flex h-52 w-full max-w-52 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-primary/30">
            {hasImage ? (
              <>
                <img
                  src={imageUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Book Cover Preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x600?text=Invalid+image+url";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="size-9 rounded-full"
                    onClick={onRemove}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-9 rounded-full"
                    onClick={() => window.open(imageUrl, "_blank")}
                  >
                    <RefreshCw className="size-4" />
                  </Button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => console.log("Upload image")}
                className="text-center p-4 w-full h-full flex flex-col items-center justify-center gap-2"
              >
                <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="size-8" />
                </div>
                <p className="text-xs font-medium text-slate-600">
                  {t("dashboard.products.create.imagePreview.emptyTitle")}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {t("dashboard.products.create.imagePreview.emptyDescription")}
                </p>
              </button>
            )}
          </div>
        </div>

        {/* URL */}
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1">
            <LinkIcon className="size-3" />{" "}
            {t("dashboard.products.create.imagePreview.urlLabel")}
          </Label>

          <Input
            placeholder="https://example.com/cover.jpg"
            className="h-10 rounded-xl bg-muted/20 text-xs font-mono transition-colors focus-visible:bg-white"
            value={imageUrl || ""}
            onChange={(e) => onUrlChange?.(e.target.value)}
          />

          <div className="rounded-lg bg-blue-50/50 border border-blue-100 p-3">
            <p className="text-[10px] text-blue-700 leading-relaxed">
              {t.rich("dashboard.products.create.imagePreview.tip", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
