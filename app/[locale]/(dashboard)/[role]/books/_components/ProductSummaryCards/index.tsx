"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Building2, CheckCircle2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type BookStats = {
  totalBooks?: number;
  activeBooks?: number;
  totalAuthors?: number;
  totalPublishers?: number;
};

type Translator = ReturnType<typeof useTranslations>;

export function ProductSummaryCards({
  bookStats,
  t,
}: {
  bookStats?: BookStats;
  t: Translator;
}) {
  const cards = [
    {
      label: t("dashboard.products.summary.totalProducts"),
      value: bookStats?.totalBooks ?? 0,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: t("dashboard.products.summary.activeProducts"),
      value: bookStats?.activeBooks ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
    {
      label: t("dashboard.products.summary.totalAuthors"),
      value: bookStats?.totalAuthors ?? 0,
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: t("dashboard.products.summary.totalPublishers"),
      value: bookStats?.totalPublishers ?? 0,
      icon: Building2,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="border-none shadow-sm ring-1 ring-slate-200"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {card.label}
            </CardTitle>
            <card.icon className={`size-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
