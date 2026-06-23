"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardNotFound() {
  const pathname = usePathname();

  return (
    <div className="grid min-h-[80vh] place-items-center bg-paper p-6">
      <div className="text-center">
        {/* abstract illustration: empty shelf / books */}
        <div className="mx-auto mb-8 flex h-24 w-32 items-end justify-center gap-2 border-b-2 border-ink">
          <div className="h-16 w-4 rounded-t-sm bg-ink"></div>
          <div className="h-20 w-5 rounded-t-sm bg-accent"></div>
          <div className="h-12 w-4 origin-bottom-right -rotate-12 rounded-t-sm bg-ink-2"></div>
        </div>

        <h1 className="display text-[80px] font-bold leading-none text-ink">
          404
        </h1>

        <p className="mt-4 text-[15px] font-medium text-ink">
          This page wandered off the shelf.
        </p>

        <p className="mt-2 text-[13px] text-ink-3">
          The route <span className="font-mono">{pathname}</span> doesn't exist.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="btn-ink inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px]"
          >
            <ArrowLeft className="h-4 w-4" /> Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
