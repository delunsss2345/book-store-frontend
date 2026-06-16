import { Card, CardContent } from "@/src/components/ui/card";
import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardContent className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-border/70 bg-muted/40">
          <SearchX className="size-7 text-slate-600 dark:text-slate-300" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-slate-950 dark:text-slate-50">
          Không tìm thấy đơn hàng
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Vui lòng kiểm tra lại mã đơn hàng hoặc liên hệ bộ phận hỗ trợ để được
          kiểm tra nhanh hơn.
        </p>
      </CardContent>
    </Card>
  );
}
