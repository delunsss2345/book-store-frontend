"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ArrowUpRight,
  BookOpen,
  CircleDollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { numberFmt, revenueChartConfig, type RevenuePoint } from "../dashboard.data";

export function OverviewTab({
  range,
  setRange,
  filteredRevenue,
}: {
  range: "12m" | "6m" | "3m";
  setRange: (v: "12m" | "6m" | "3m") => void;
  filteredRevenue: RevenuePoint[];
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Net Revenue",
            value: "$1,18M",
            change: "+12.4%",
            icon: CircleDollarSign,
          },
          {
            title: "Orders",
            value: "24,918",
            change: "+8.1%",
            icon: ShoppingBag,
          },
          {
            title: "New Customers",
            value: "3,274",
            change: "+14.9%",
            icon: Users,
          },
          {
            title: "Books In Stock",
            value: "12,085",
            change: "+2.2%",
            icon: BookOpen,
          },
        ].map((metric) => (
          <Card key={metric.title} className="border-zinc-200 bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between text-xs uppercase tracking-wide">
                {metric.title}
                <metric.icon className="h-4 w-4 text-zinc-500" />
              </CardDescription>
              <CardTitle className="text-2xl font-black">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                {metric.change}
                <ArrowUpRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="border-zinc-200">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Revenue Momentum</CardTitle>
              <CardDescription>Area chart from shadcn chart primitives</CardDescription>
            </div>

            <div className="inline-flex rounded-md border p-1">
              {[
                { label: "3M", value: "3m" as const },
                { label: "6M", value: "6m" as const },
                { label: "12M", value: "12m" as const },
              ].map((item) => (
                <Button
                  key={item.value}
                  variant={range === item.value ? "default" : "ghost"}
                  size="sm"
                  className="h-7 px-3"
                  onClick={() => setRange(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <ChartContainer config={revenueChartConfig} className="h-[280px] w-full">
              <AreaChart data={filteredRevenue} margin={{ left: 8, right: 8 }}>
                <defs>
                  <linearGradient id="grossFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-gross)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="var(--color-gross)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-net)" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="var(--color-net)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short" })
                  }
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      }
                    />
                  }
                />
                <Area dataKey="gross" type="natural" stroke="var(--color-gross)" fill="url(#grossFill)" strokeWidth={2} />
                <Area dataKey="net" type="natural" stroke="var(--color-net)" fill="url(#netFill)" strokeWidth={2} />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle>Top Inventory Alerts</CardTitle>
            <CardDescription>Need restock in next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { sku: "BK-00291", name: "The Linux Kernel Journey", left: 11 },
              { sku: "BK-00318", name: "Next.js In Practice", left: 9 },
              { sku: "BK-00412", name: "System Design for APIs", left: 7 },
              { sku: "BK-00537", name: "Secure Payment Flows", left: 5 },
            ].map((item) => (
              <div key={item.sku} className="rounded-xl border border-zinc-200 p-3">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
                  <span>{item.sku}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                    <Package className="h-3.5 w-3.5" /> {item.left} left
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
