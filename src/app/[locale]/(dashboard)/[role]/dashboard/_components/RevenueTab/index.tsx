"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { channelChartConfig, channelData } from "../dashboard.data";

export function RevenueTab() {
  return (
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
  );
}
