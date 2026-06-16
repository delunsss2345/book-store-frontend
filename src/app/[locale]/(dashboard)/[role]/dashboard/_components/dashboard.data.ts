import type { ChartConfig } from "@/src/components/ui/chart";

export type RevenuePoint = {
  date: string;
  gross: number;
  net: number;
};

export const revenueData: RevenuePoint[] = [
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

export const channelData = [
  { month: "Jan", marketplace: 180, website: 120 },
  { month: "Feb", marketplace: 210, website: 135 },
  { month: "Mar", marketplace: 230, website: 150 },
  { month: "Apr", marketplace: 245, website: 170 },
  { month: "May", marketplace: 280, website: 195 },
  { month: "Jun", marketplace: 310, website: 225 },
];

export const revenueChartConfig = {
  gross: {
    label: "Gross",
    color: "hsl(203 89% 53%)",
  },
  net: {
    label: "Net",
    color: "hsl(142 76% 36%)",
  },
} satisfies ChartConfig;

export const channelChartConfig = {
  marketplace: {
    label: "Marketplace",
    color: "hsl(217 91% 60%)",
  },
  website: {
    label: "Website",
    color: "hsl(263 70% 58%)",
  },
} satisfies ChartConfig;

export const numberFmt = new Intl.NumberFormat("en-US");
