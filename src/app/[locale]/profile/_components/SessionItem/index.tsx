"use client";

import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export interface SessionItemProps {
  icon: ReactNode;
  deviceInfo: string;
  locationAndIp: string;
  isCurrentSession?: boolean;
  lastActiveTime?: string;
  onSignOut?: () => void;
}

export default function SessionItem({
  icon,
  deviceInfo,
  locationAndIp,
  isCurrentSession,
  lastActiveTime,
  onSignOut,
}: SessionItemProps) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "rounded-2xl bg-surface p-5",
        isCurrentSession
          ? "border-2 border-ink"
          : "flex items-start justify-between gap-4 border border-line",
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper",
            isCurrentSession ? "text-ink" : "text-ink-2",
          )}
        >
          {icon}
        </span>
        <div>
          {isCurrentSession ? (
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-ink">{deviceInfo}</p>
              <span className="bg-accent-soft text-accent rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {t("profile.session.current") || "Current"}
              </span>
            </div>
          ) : (
            <p className="text-[14px] font-bold text-ink">{deviceInfo}</p>
          )}

          <p className="mt-1 text-[13px] text-ink-2">{locationAndIp}</p>

          {isCurrentSession ? (
            <p className="text-ok mt-0.5 inline-flex items-center gap-1.5 text-[12px] font-medium">
              <span className="bg-ok h-1.5 w-1.5 rounded-full"></span>
              {t("profile.session.activeNow") || "Active now"}
            </p>
          ) : (
            <p className="mt-0.5 text-[12px] text-ink-3">
              {t("profile.session.lastActive", { time: lastActiveTime ?? 0 }) ||
                `Last active ${lastActiveTime}`}
            </p>
          )}
        </div>
      </div>

      {!isCurrentSession && (
        <button
          onClick={onSignOut}
          className="btn-outline hover:bg-paper hover:text-ink flex h-9 shrink-0 items-center gap-1.5 rounded-lg border-none px-3 text-[12px] text-ink-2"
        >
          <LogOut className="h-3.5 w-3.5" />
          {t("profile.session.signOut") || "Sign out"}
        </button>
      )}
    </div>
  );
}
