"use client";

import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PurchaseOrderPagination() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50/30 dark:bg-slate-900/20 px-6 py-4 md:flex-row text-sm text-muted-foreground">
      <p>Hiển thị 6 / 6 đơn nhập hàng</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0 bg-slate-950 dark:bg-slate-50 dark:text-slate-900 shadow-sm"
          >
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
