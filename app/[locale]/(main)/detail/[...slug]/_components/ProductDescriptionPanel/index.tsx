"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import type { BookDetail } from "@/types/response/catalog.response";
import { cn } from "@/lib/utils";
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
    <section className="mt-20 border-t border-neutral-100">
      <div className="mx-auto max-w-5xl">
        {/* Read More Section */}
        <Collapsible
          open={readMoreOpen}
          onOpenChange={setReadMoreOpen}
          className="border-b border-neutral-100"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-8 text-[13px] font-bold uppercase tracking-[0.2em]">
            <span>Product Description</span>
            {readMoreOpen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-12 transition-all">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="prose prose-neutral max-w-none text-[15px] leading-8 text-neutral-600">
                <h3 className="font-serif text-2xl text-neutral-900">
                  {bookDetail.title}
                </h3>
                <p className="mt-4">{bookDetail.description}</p>
              </div>
              <div className="space-y-6 text-[14px]">
                <div className="rounded-sm border border-neutral-100 p-6">
                  <h4 className="mb-4 font-bold uppercase tracking-widest text-neutral-900">
                    Specification
                  </h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-neutral-50 pb-2">
                      <dt className="text-neutral-500">Publisher</dt>
                      <dd className="font-medium">
                        {bookDetail.publisherName || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-50 pb-2">
                      <dt className="text-neutral-500">Format</dt>
                      <dd className="font-medium">Paperback, 6x9 inches</dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-50 pb-2">
                      <dt className="text-neutral-500">ISBN-13</dt>
                      <dd className="font-medium">978-0123456789</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Reviews Section */}
        <Collapsible
          open={reviewsOpen}
          onOpenChange={setReviewsOpen}
          className="border-b border-neutral-100"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-8 text-[13px] font-bold uppercase tracking-[0.2em]">
            <span>Customer Reviews ({bookDetail.ratingCount})</span>
            {reviewsOpen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-12">
            <div className="text-center py-10">
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < (bookDetail.ratingAvg || 0)
                        ? "fill-black text-black"
                        : "text-neutral-200",
                    )}
                  />
                ))}
              </div>
              <p className="text-neutral-500">{t("detail.noReviews")}</p>
              <Button
                variant="outline"
                className="mt-6 rounded-none px-8 uppercase tracking-widest text-[11px] font-bold"
              >
                Write a review
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}
