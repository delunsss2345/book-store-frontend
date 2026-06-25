import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <Loader2 className="absolute size-5 text-primary animate-pulse" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest animate-pulse">
        Đang tải dữ liệu...
      </p>
    </div>
  );
}
