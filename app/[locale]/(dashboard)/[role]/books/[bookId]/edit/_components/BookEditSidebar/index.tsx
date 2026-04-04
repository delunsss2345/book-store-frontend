"use client";

import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ImageIcon,
  Upload,
  Copy,
  ExternalLink,
  History,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/features/admin";
import { LoadingLazy } from "@/components/common/LoadingLazy";

export function AdminBookEditSidebar({ t }: { t: any }) {
  const { bookDraft, updateBookDraft } = useAdminStore();

  if (!bookDraft) return <LoadingLazy />;

  return (
    <div className="space-y-6 lg:col-span-4">
      {/* 1. Trạng thái - Gọn gàng, hiện đại */}
      <div className="rounded-2xl border border-border/50 bg-background p-5 shadow-sm ring-1 ring-border/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              {t("dashboard_products.edit.releaseStatus")}
            </h4>
            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${
                  bookDraft.isActive
                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-pulse"
                    : "bg-slate-300"
                }`}
              />
              <span className="text-sm font-bold text-foreground">
                {bookDraft.isActive ? "Đang mở bán" : "Lưu nháp"}
              </span>
            </div>
          </div>
          <Switch
            checked={bookDraft.isActive}
            onCheckedChange={(checked) => updateBookDraft("isActive", checked)}
            className="data-[state=checked]:bg-emerald-600"
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed pt-4 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-tight">
          <div className="flex items-center gap-1">
            <History className="size-3" />
            Cập nhật lần cuối
          </div>
          <span className="font-mono text-foreground">
            {new Date(bookDraft?.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 2. Ảnh bìa - Kích thước lớn hơn & Hiệu ứng chiều sâu */}
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm ring-1 ring-border/5">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 flex items-center gap-2">
            <ImageIcon className="size-3" />
            {t("dashboard_products.edit.currentCover")}
          </h4>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-muted-foreground"
          >
            <RefreshCw className="size-3" />
          </Button>
        </div>

        <CardContent className="p-5 pt-2 space-y-6">
          {/* Cover Preview - Đã tăng max-w lên 210px */}
          <div className="relative mx-auto w-full max-w-[210px] group">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
              {/* Hiệu ứng gáy sách (Spine) giúp ảnh thật hơn */}
              <div className="absolute inset-y-0 left-0 w-[8px] bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10" />
              <div className="absolute inset-y-0 left-[8px] w-[1px] bg-white/10 z-10" />

              <img
                src={bookDraft.coverImageUrl}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 rounded-xl text-[11px] font-bold shadow-2xl ring-1 ring-white/20"
                >
                  <Upload className="mr-2 size-3.5" /> Thay đổi ảnh bìa
                </Button>
              </div>
            </div>

            {/* Hiệu ứng bóng đổ dưới chân ảnh (Floor shadow) */}
            <div className="absolute -bottom-4 left-1/2 h-4 w-[80%] -translate-x-1/2 bg-black/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Image URL Area - Gọn gàng & Tiện ích */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                Image Path
              </Label>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold text-primary/70 hover:text-primary transition-colors">
                  Edit URL
                </button>
              </div>
            </div>

            <div className="group relative flex items-center">
              <Input
                value={bookDraft.coverImageUrl}
                readOnly
                className="h-9 rounded-xl border-none bg-muted/50 pr-16 text-[10px] font-mono text-muted-foreground/80 shadow-none ring-0 focus-visible:ring-0"
              />
              <div className="absolute right-1 flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 rounded-lg hover:bg-background hover:shadow-sm"
                  title="Copy URL"
                >
                  <Copy className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 rounded-lg hover:bg-background hover:shadow-sm"
                  title="Open Link"
                >
                  <ExternalLink className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
