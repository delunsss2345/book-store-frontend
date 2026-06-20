"use client";

import useTranslator from "@/hooks/use-translator";
import { LogOut, ShieldCheck } from "lucide-react";
import SessionList from "../../_components/SessionList";

export default function SessionsPage() {
  const { t } = useTranslator();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-[28px] font-semibold tracking-tight">
            {t("profile.session.title") || "Sessions & Devices"}
          </h1>
          <p className="mt-2 text-[14px] text-ink-2">
            {t("profile.session.description") ||
              "Review where you’re signed in and sign out of devices you don’t recognize."}
          </p>
        </div>
        <button className="btn-outline h-10 gap-2 rounded-lg px-4 text-[13px] flex items-center">
          <LogOut className="h-4 w-4" />
          {t("profile.session.signOutAll") || "Sign out all other devices"}
        </button>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="text-[13px] leading-6 text-ink-2">
          <span className="font-semibold text-ink">
            {t("profile.session.activeSessions", { count: 4 }) ||
              "4 active sessions."}{" "}
          </span>
          {t("profile.session.warning") ||
            "If you see a device you don’t recognize, sign it out and change your password right away."}
        </div>
      </div>

      <SessionList />
    </div>
  );
}
