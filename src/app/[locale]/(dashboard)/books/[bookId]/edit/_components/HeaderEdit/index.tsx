"use client";

import { ChevronLeft, History, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import useTranslator from "@/hooks/use-translator";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface HeaderEditProps {
  detail: { id: string | number; updatedAt?: string };
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-10">
        {/* LEFT SIDE: Navigation & Context */}
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9 shrink-0 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold tracking-tight text-foreground truncate max-w-[300px] lg:max-w-[500px]">
                {defaultTranslation?.title || "Untitled Book"}
              </h1>
              <Badge
                variant="secondary"
                className="hidden rounded-lg bg-muted/50 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground sm:inline-flex"
              >
                #{detail.id}
              </Badge>
            </div>

            {/* Sub-info: Giúp header có độ dày vừa phải mà không bị thô */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">
              <span>{t("dashboard_products.edit.editing")}</span>
              <span className="text-muted-foreground/30">•</span>
              <div className="flex items-center gap-1">
                <History className="size-3" />
                <span>
                  Last updated:{" "}
                  {detail.updatedAt
                    ? new Date(detail.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Nút Hủy - Làm rõ ràng hơn */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hidden h-10 px-4 text-sm font-semibold text-muted-foreground hover:text-foreground md:inline-flex"
          >
            {t("dashboard_products.edit.cancel")}
          </Button>

          {/* Nút Xóa - Dùng Outline để giảm sự chú ý nhưng vẫn dễ bấm */}
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="h-10 gap-2 border-destructive/20 px-4 text-sm font-bold text-destructive hover:bg-destructive/5 hover:border-destructive/40"
          >
            <Trash2 className="size-4" />
            <span className="hidden lg:inline">Xóa sách</span>
          </Button>

          <div className="mx-1 h-6 w-[1px] bg-border/60" />

          {/* Nút Save - To và nổi bật nhất */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-10 min-w-[140px] gap-2 rounded-xl bg-primary px-6 text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px] hover:shadow-xl active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isSaving ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
