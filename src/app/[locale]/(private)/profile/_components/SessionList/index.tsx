"use client";

import { Laptop, Smartphone, Tablet, LogOut, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";

import SessionItem from "../SessionItem";

export default function SessionList() {
  const t = useTranslations();

  return (
    <>
      <h3 className="mt-8 mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-3">
        {t("profile.session.thisDevice") || "This device"}
      </h3>

      <SessionItem
        icon={<Laptop className="h-5 w-5" />}
        deviceInfo="MacBook Pro · Chrome"
        locationAndIp="Hồ Chí Minh, Vietnam · 113.161.xx.xx"
        isCurrentSession={true}
      />

      <h3 className="mt-8 mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-3">
        {t("profile.session.otherSessions") || "Other sessions"}
      </h3>
      <div className="space-y-3">
        {/* Session 1 */}
        <SessionItem
          icon={<Smartphone className="h-5 w-5" />}
          deviceInfo="iPhone 15 · Velora App"
          locationAndIp="Hồ Chí Minh, Vietnam · 171.244.xx.xx"
          lastActiveTime="2 hours ago"
          onSignOut={() => {}}
        />

        {/* Session 2 */}
        <SessionItem
          icon={<Tablet className="h-5 w-5" />}
          deviceInfo="iPad Air · Safari"
          locationAndIp="Đà Nẵng, Vietnam · 14.169.xx.xx"
          lastActiveTime="3 days ago"
          onSignOut={() => {}}
        />

        {/* Session 3 */}
        <SessionItem
          icon={<Monitor className="h-5 w-5" />}
          deviceInfo="Windows PC · Edge"
          locationAndIp="Hà Nội, Vietnam · 203.113.xx.xx"
          lastActiveTime="12 Jun 2026"
          onSignOut={() => {}}
        />
      </div>
    </>
  );
}
