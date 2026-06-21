"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { User, Shield, Laptop } from "lucide-react";
import React from "react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();

  const navItems = [
    {
      label: t("profile.settings.nav.personalInfo"),
      href: "/profile/settings",
      icon: User,
      exact: true,
    },
    {
      label: t("profile.settings.nav.security"),
      href: "/profile/settings/security",
      icon: Shield,
      exact: false,
    },
    {
      label: t("profile.settings.nav.sessions"),
      href: "/profile/settings/session",
      icon: Laptop,
      exact: false,
    },
  ];

  return (
    <div className="bg-paper min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="display text-[28px] font-semibold tracking-tight">
            {t("profile.settings.title")}
          </h1>
          <p className="mt-2 text-[14px] text-ink-2">
            {t("profile.settings.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium transition-colors ${
                    isActive
                      ? "bg-surface text-ink shadow-sm ring-1 ring-line"
                      : "text-ink-2 hover:bg-surface hover:text-ink"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-ink-3"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
