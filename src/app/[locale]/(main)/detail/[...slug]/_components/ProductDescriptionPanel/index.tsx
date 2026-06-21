
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import type { BookDetail } from "@/types/response/catalog.response";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

export function ProductDescriptionPanel({
  bookDetail,
}: {
  bookDetail: BookDetail;
}) {
  const [readMoreOpen, setReadMoreOpen] = React.useState(true);

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

      {/* Reviews Section hidden */}
    </div>
  );
}
