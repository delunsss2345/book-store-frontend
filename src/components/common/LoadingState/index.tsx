import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4">
      <Loader2 className="size-10 text-blue-500 animate-spin" />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
        Đang tải...
      </p>
    </div>
  );
}
