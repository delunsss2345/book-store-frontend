"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationStatus = "accepted" | "rejected";

type NotificationItemProps = {
  title: string;
  description: string;
  minutesAgo: number;
  status: NotificationStatus;
};

export default function NotificationItem({
  title,
  description,
  minutesAgo,
  status,
}: NotificationItemProps) {
  const isAccepted = status === "accepted";

  return (
    <div className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-zinc-50">
      <div
        className={cn(
          "mt-0.5 flex size-9 items-center justify-center rounded-full",
          isAccepted
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600",
        )}
      >
        {isAccepted ? (
          <CheckCircle2 size={18} strokeWidth={1.8} />
        ) : (
          <XCircle size={18} strokeWidth={1.8} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{description}</p>

        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400">
          <Clock3 size={14} strokeWidth={1.8} />
          <span>{minutesAgo} phút trước</span>
        </div>
      </div>
    </div>
  );
}
