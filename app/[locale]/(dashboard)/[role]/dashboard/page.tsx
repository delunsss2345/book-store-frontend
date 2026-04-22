"use client";

import { Badge } from "@/components/ui/badge";
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
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  CircleDollarSign,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type RevenuePoint = {
  date: string;
  gross: number;
  net: number;
};

const revenueData: RevenuePoint[] = [
  { date: "2026-01-01", gross: 920, net: 540 },
  { date: "2026-02-01", gross: 1010, net: 610 },
  { date: "2026-03-01", gross: 980, net: 590 },
  { date: "2026-04-01", gross: 1240, net: 770 },
  { date: "2026-05-01", gross: 1320, net: 860 },
  { date: "2026-06-01", gross: 1480, net: 920 },
  { date: "2026-07-01", gross: 1430, net: 900 },
  { date: "2026-08-01", gross: 1510, net: 960 },
  { date: "2026-09-01", gross: 1610, net: 1010 },
  { date: "2026-10-01", gross: 1670, net: 1060 },
  { date: "2026-11-01", gross: 1730, net: 1120 },
  { date: "2026-12-01", gross: 1810, net: 1180 },
];

const channelData = [
  { month: "Jan", marketplace: 180, website: 120 },
  { month: "Feb", marketplace: 210, website: 135 },
  { month: "Mar", marketplace: 230, website: 150 },
  { month: "Apr", marketplace: 245, website: 170 },
  { month: "May", marketplace: 280, website: 195 },
  { month: "Jun", marketplace: 310, website: 225 },
];

const revenueChartConfig = {
  gross: {
    label: "Gross",
    color: "hsl(203 89% 53%)",
  },
  net: {
    label: "Net",
    color: "hsl(142 76% 36%)",
  },
} satisfies ChartConfig;

const channelChartConfig = {
  marketplace: {
    label: "Marketplace",
    color: "hsl(217 91% 60%)",
  },
  website: {
    label: "Website",
    color: "hsl(263 70% 58%)",
  },
} satisfies ChartConfig;

const numberFmt = new Intl.NumberFormat("en-US");

export default function Dashboard() {
  const [range, setRange] = useState<"12m" | "6m" | "3m">("6m");

  const filteredRevenue = useMemo(() => {
    if (range === "12m") return revenueData;
    if (range === "6m") return revenueData.slice(-6);
    return revenueData.slice(-3);
  }, [range]);

  return (
    <div className="space-y-6 pb-6">
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-[420px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Marketplace vs website contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={channelChartConfig} className="h-[300px] w-full">
                <AreaChart data={channelData} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area dataKey="marketplace" stroke="var(--color-marketplace)" fill="var(--color-marketplace)" fillOpacity={0.15} strokeWidth={2} type="monotone" />
                  <Area dataKey="website" stroke="var(--color-website)" fill="var(--color-website)" fillOpacity={0.15} strokeWidth={2} type="monotone" />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Customer Snapshot</CardTitle>
              <CardDescription>Quick mock data for active buyers</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                { name: "Devon Lane", orders: 28, spend: 4120 },
                { name: "Wade Warren", orders: 19, spend: 2950 },
                { name: "Leslie Alexander", orders: 14, spend: 2240 },
                { name: "Jane Cooper", orders: 11, spend: 1840 },
              ].map((customer) => (
                <div key={customer.name} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-xs text-zinc-500">{numberFmt.format(customer.orders)} orders</p>
                  </div>
                  <p className="text-sm font-bold">${numberFmt.format(customer.spend)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
