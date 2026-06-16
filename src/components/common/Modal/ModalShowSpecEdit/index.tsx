"use client";

import { useAdminStore } from "@/features/admin";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  BookOpenText,
  Building2,
  CalendarDays,
  Hash,
  Ruler,
  Scale,
} from "lucide-react";

export default function ModelShowSpecEdit() {
  const { bookDraft, setBookDraft } = useAdminStore();
  const { data: suppliers } = useSupplierQuery();

  const updateField = (
    field: "weightGrams" | "pageCount" | "publisherId" | "publicationYear",
    value: string | number,
  ) => {
    if (!bookDraft) return;

    setBookDraft({
      ...bookDraft,
      [field]: value,
    });
  };

  if (!bookDraft) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/10">
        <p className="text-muted-foreground font-medium">
          Không có dữ liệu sách để hiển thị
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 py-4">
      {/* 1. Header: Tối giản & Rộng */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            <Ruler className="size-4" />
            Technical Specifications
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Thông số <span className="text-muted-foreground">chi tiết</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Cấu hình các thuộc tính vật lý và thông tin xuất bản. Các thông tin
            này giúp khách hàng hiểu rõ hơn về sản phẩm.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-2 pr-4 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <BookOpenText className="size-5" />
          </div>
          <div className="max-w-[200px]">
            <p className="truncate text-sm font-bold text-foreground">
              {bookDraft.translation?.[0]?.title || "Chưa có tiêu đề"}
            </p>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tight">
              Metadata Edition
            </p>
          </div>
        </div>
      </header>

      {/* 2. Main Content: Chia Grid rộng rãi */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Nhóm 1: Thông số vật lý */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <div className="size-2 rounded-full bg-sky-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Kích thước & Trọng lượng
            </h3>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Scale className="size-3.5" /> Trọng lượng (Grams)
              </Label>
              <div className="relative group">
                <Input
                  type="number"
                  value={bookDraft.weightGrams ?? ""}
                  onChange={(e) =>
                    updateField("weightGrams", Number(e.target.value) || 0)
                  }
                  className="h-12 rounded-xl border-border bg-background px-4 text-base font-semibold transition-all group-hover:border-sky-200 focus-visible:ring-sky-500"
                  placeholder="Ví dụ: 500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/50">
                  g
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                * Dùng để tính phí vận chuyển tự động
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Hash className="size-3.5" /> Số trang
              </Label>
              <Input
                type="number"
                value={bookDraft.pageCount ?? ""}
                onChange={(e) =>
                  updateField("pageCount", Number(e.target.value) || 0)
                }
                className="h-12 rounded-xl border-border bg-background px-4 text-base font-semibold transition-all hover:border-sky-200 focus-visible:ring-sky-500"
                placeholder="Ví dụ: 320"
              />
            </div>
          </div>
        </section>

        {/* Nhóm 2: Xuất bản */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <div className="size-2 rounded-full bg-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Thông tin xuất bản
            </h3>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Building2 className="size-3.5" /> Nhà xuất bản / Tác giả
              </Label>
              <p className="text-base font-semibold text-foreground">
                {bookDraft.publisherName ?? "-"} / {bookDraft.authorName ?? "-"}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                <CalendarDays className="size-3.5" /> Năm xuất bản
              </Label>
              <Input
                type="number"
                value={bookDraft.publicationYear ?? ""}
                onChange={(e) =>
                  updateField("publicationYear", Number(e.target.value) || 0)
                }
                className="h-12 rounded-xl border-border bg-background px-4 text-base font-semibold transition-all hover:border-sky-200 focus-visible:ring-sky-500"
                placeholder="Ví dụ: 2024"
              />
            </div>
          </div>
        </section>
      </div>

      {/* 3. Helper Note */}
      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/50 p-4 text-sky-800">
        <div className="rounded-full bg-sky-100 p-1">
          <Ruler className="size-4" />
        </div>
        <div className="text-xs leading-relaxed">
          <strong>Lưu ý:</strong> Các thông số kỹ thuật cần độ chính xác cao để
          hiển thị trên website và tính toán logictics. Vui lòng kiểm tra kỹ
          trọng lượng (gram) trước khi lưu.
        </div>
      </div>
    </div>
  );
}
