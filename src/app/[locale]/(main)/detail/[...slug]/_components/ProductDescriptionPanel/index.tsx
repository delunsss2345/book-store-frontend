import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import type { BookDetail } from "@/types/response/catalog.response";
import { Heart, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export function ProductDescriptionPanel({
  bookDetail,
}: {
  bookDetail: BookDetail;
}) {
  const t = useTranslations();
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);
  const [reviewsOpen, setReviewsOpen] = React.useState(false);

  return (
    <div className="mx-auto mt-12 max-w-5xl border-t border-line">
      {/* Read More Section */}
      <Collapsible
        open={readMoreOpen}
        onOpenChange={setReadMoreOpen}
        className="border-b border-line"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-5 text-[13px] font-bold uppercase tracking-[0.2em] text-ink">
          <span>Product Description</span>
          {readMoreOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-10 transition-all">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="display text-[24px] font-semibold text-ink">
                {bookDetail.title}
              </h3>
              <p className="mt-4 text-[15px] leading-8 text-ink-2">
                {bookDetail.description}
              </p>
            </div>
            <div className="rounded-md border border-line p-6 text-[14px]">
              <h4 className="mb-4 font-bold uppercase tracking-widest text-ink">
                Specification
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="text-ink-3">Publisher</dt>
                  <dd className="font-medium text-ink">
                    {bookDetail.publisherName || "Velora"}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="text-ink-3">Format</dt>
                  <dd className="font-medium text-ink">Hardcover, XXL</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="text-ink-3">ISBN-13</dt>
                  <dd className="font-medium text-ink">978-3836574204</dd>
                </div>
              </dl>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Reviews Section */}
      <Collapsible
        open={reviewsOpen}
        onOpenChange={setReviewsOpen}
        className="border-b border-line"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-5 text-[13px] font-bold uppercase tracking-[0.2em] text-ink">
          <span>Customer Reviews ({bookDetail.ratingCount || 0})</span>
          {reviewsOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-10">
          <div className="text-center py-10">
            <div className="mb-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < (bookDetail.ratingAvg || 0)
                      ? "fill-ink text-ink"
                      : "text-line-2",
                  )}
                />
              ))}
            </div>
            <p className="text-ink-3">{t("detail.noReviews")}</p>
            <button className="btn-outline mt-6 rounded-lg px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-ink">
              Write a review
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
