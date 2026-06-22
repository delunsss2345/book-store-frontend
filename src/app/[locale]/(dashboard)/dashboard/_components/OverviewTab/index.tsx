"use client";

import { Button } from "@/src/components/ui/button";
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
import {
  ArrowUpRight,
  BookOpen,
  CircleDollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { revenueChartConfig, type RevenuePoint } from "../dashboard.data";

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
      {/* stats */}
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            title: "Doanh thu",
            value: "3.4M",
            unit: "đ",
            change: "12.5%",
            trend: "up"
          },
          {
            title: "Đơn hàng",
            value: "1,248",
            change: "8.1%",
            trend: "up"
          },
          {
            title: "Khách hàng mới",
            value: "892",
            change: "2.4%",
            trend: "down"
          },
          {
            title: "Sách tồn kho",
            value: "45,120",
            change: "1.2%",
            trend: "up"
          }
        ].map((metric) => (
          <div key={metric.title} className="stat">
            <div className="stat-k">{metric.title}</div>
            <div className="stat-v">
              {metric.value}
              {metric.unit && <span className="text-[17px] text-ink-3">{metric.unit}</span>}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className={metric.trend === 'up' ? 'delta-up' : 'delta-dn'}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5 rotate-90" />} {metric.change}
              </div>
              <div className="text-[11px] font-medium text-ink-3">so với tháng trước</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        {/* chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[15px] font-semibold text-ink">Phân tích Doanh thu</h4>
              <p className="text-[12px] text-ink-3">Dữ liệu từ mọi kênh bán hàng</p>
            </div>
          </div>
          <div className="mt-6 h-[280px]">
            <ChartContainer config={revenueChartConfig} className="h-full w-full">
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
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
          </div>
        </div>

        {/* inventory alerts */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[15px] font-semibold text-ink">Cần nhập kho gấp</h4>
              <p className="text-[12px] text-ink-3">Sắp hết hàng trong 7 ngày tới</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { sku: "BK-2918", name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", left: 4 },
              { sku: "BK-3184", name: "Dế Mèn Phiêu Lưu Ký", left: 9 },
              { sku: "BK-4122", name: "Đất Rừng Phương Nam", left: 12 },
              { sku: "BK-5371", name: "Tuổi Trẻ Đáng Giá Bao Nhiêu", left: 15 },
            ].map((item) => (
              <div key={item.sku} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded bg-white shadow-sm">
                  <BookOpen className="h-4 w-4 text-ink-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[13px] font-semibold text-ink">{item.name}</div>
                  <div className="text-[11px] text-ink-3">{item.sku}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-accent">Còn {item.left}</div>
                  <div className="text-[11px] text-ink-3">quyển</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
