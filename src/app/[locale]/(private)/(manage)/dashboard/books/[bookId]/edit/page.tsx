"use client";

import { Languages } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";

import {
  useAdminBookQuery,
  useAdminStore,
  useUpdateBookMutation,
} from "@/features/admin";
import useTranslator from "@/hooks/use-translator";
import { LoadingLazy } from "@/src/components/common/LoadingLazy";
import { UpdateAdminBookPayload } from "@/types/request/admin.request";

import { AdminBookDetailData } from "@/types/response/admin-book-detail.response";
import { toast } from "sonner";
import { AdminBookEditSidebar } from "./_components/BookEditSidebar";
import HeaderEdit from "./_components/HeaderEdit";
import { TranslationTabs } from "./_components/TranslationTabs";

export default function EditBookPage() {
  const { t } = useTranslator();
  const { bookId } = useParams<{ bookId: string }>();

  const { data: bookDetail, isLoading } = useAdminBookQuery(bookId || "");
  const { mutateAsync: updateBook } = useUpdateBookMutation();

  const detail = bookDetail as AdminBookDetailData | undefined;
  const { bookDraft, setBookDraft, setBookDetail } = useAdminStore();

  useEffect(() => {
    if (!detail) return;
    setBookDetail(detail);
    setBookDraft(detail);
  }, [detail, setBookDetail, setBookDraft]);

  const defaultTranslation = useMemo(() => {
    return detail?.translation?.[0];
  }, [detail]);

  const handleSave = async () => {
    if (!bookDraft) return;

    const payload: UpdateAdminBookPayload = {
      isActive: bookDraft.isActive,
      coverImageUrl: bookDraft.coverImageUrl,
      weightGrams: Number(bookDraft.weightGrams),
      pageCount: Number(bookDraft.pageCount),
      translations: bookDraft.translation.map((item) => ({
        languageId: item.languageId,
        title: item.title,
        description: item.description,
      })),
      variants: bookDraft.variants.map((variant) => ({
        id: Number(variant.id),
        costPrice: Number(variant.costPrice),
        price: Number(variant.price),
        isActive: variant.isActive,
      })),
    };

    toast.promise(updateBook({ bookId: bookId || "", payload }), {
      loading: "Đang cập nhật sách...",
      success: "Cập nhật sách thành công",
      error: (error) => error.response.data.message,
    });
  };

  if (!bookId || (isLoading && !detail) || !detail) return <LoadingLazy />;

  return (
    <div className="mx-auto  space-y-10 pb-20">
      {/* 1. Top Header Component */}
      <HeaderEdit
        detail={detail}
        defaultTranslation={defaultTranslation}
        handleSave={handleSave}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-8">
          <div className="relative">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Languages className="size-4" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  Nội dung đa ngôn ngữ
                </h3>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-bold text-primary"
              >
                {detail.translation.length} LANGUAGES ACTIVE
              </Badge>
            </div>

            <Card className="overflow-hidden rounded-[2.5rem] border-border/50 bg-background shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <CardContent className="p-8">
                <TranslationTabs />
              </CardContent>
            </Card>
          </div>

          {/* Bạn có thể thêm các section khác ở dưới này nếu cần (ví dụ: SEO, Related Books) */}
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <AdminBookEditSidebar t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}
