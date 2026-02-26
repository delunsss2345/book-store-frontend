"use client";

import React from "react";
import { ImageIcon, Link as LinkIcon, RefreshCw, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const hasImage = imageUrl && imageUrl.trim() !== "";

  return (
    <Card className="shadow-sm overflow-hidden border-slate-200">
      <CardHeader className="border-b bg-slate-50/50 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-slate-500" />
            <CardTitle className="text-[11px] uppercase tracking-wider font-bold text-slate-600">
              Ảnh bìa & Preview
            </CardTitle>
          </div>
          {hasImage && (
            <Badge variant="secondary" className="text-[10px] font-normal">
              Live Preview
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Khung hiển thị ảnh */}
        <div className="relative aspect-[3/4] rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group transition-all hover:border-primary/30">
          {hasImage ? (
            <>
              <img
                src={imageUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Book Cover Preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/400x600?text=Lỗi+đường+dẫn+ảnh";
                }}
              />
              {/* Overlay khi hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="destructive"
                  size="icon"
                  className="size-8 rounded-full"
                  onClick={onRemove}
                >
                  <Trash2 className="size-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8 rounded-full"
                  onClick={() => window.open(imageUrl, "_blank")}
                >
                  <RefreshCw className="size-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center p-6">
              <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                <ImageIcon className="size-8" />
              </div>
              <p className="text-xs font-medium text-slate-500">
                Chưa có ảnh bìa
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Dán URL hoặc dùng Magic Fill
              </p>
            </div>
          )}
        </div>

        {/* Ô nhập URL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1">
              <LinkIcon className="size-3" /> Đường dẫn ảnh (URL)
            </Label>
          </div>
          <Input
            placeholder="https://example.com/cover.jpg"
            className="text-xs font-mono h-9 bg-slate-50/50 focus-visible:bg-white transition-colors"
            value={imageUrl || ""}
            onChange={(e) => onUrlChange?.(e.target.value)}
          />
        </div>

        <div className="rounded-lg bg-blue-50/50 border border-blue-100 p-3">
          <p className="text-[10px] text-blue-700 leading-relaxed">
            <b>Mẹo:</b> Nên sử dụng ảnh có tỉ lệ <b>3:4</b> (ví dụ 600x800px) để
            hiển thị đẹp nhất trên trang chi tiết.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component Badge nhỏ hỗ trợ
const Badge = ({ children, variant, className }: any) => (
  <span
    className={`px-2 py-0.5 rounded-full ${variant === "secondary" ? "bg-slate-200 text-slate-700" : ""} ${className}`}
  >
    {children}
  </span>
);
