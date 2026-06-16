"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ChartNoAxesCombined, Sparkles } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 p-6 text-white shadow-2xl">
      <div className="pointer-events-none absolute -left-14 top-0 h-36 w-36 rounded-full bg-cyan-400/20 blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Badge className="bg-white/10 text-white hover:bg-white/10">
            Live mock dashboard
          </Badge>
          <h1 className="text-2xl font-black tracking-tight md:text-3xl">
            Commerce Analytics Hub
          </h1>
          <p className="max-w-2xl text-sm text-zinc-300">
            Snapshot UI using shadcn chart area to visualize sales velocity, channel mix, and operational health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" className="gap-2 bg-white text-zinc-900 hover:bg-zinc-100">
            <Sparkles className="h-4 w-4" /> Export report
          </Button>
          <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
            <ChartNoAxesCombined className="mr-2 h-4 w-4" /> View insights
          </Button>
        </div>
      </div>
    </section>
  );
}
