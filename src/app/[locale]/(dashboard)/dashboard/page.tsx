"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { useMemo, useState } from "react";
import { CustomersTab } from "./_components/CustomersTab";
import { DashboardHero } from "./_components/DashboardHero";
import { OverviewTab } from "./_components/OverviewTab";
import { RevenueTab } from "./_components/RevenueTab";
import { revenueData } from "./_components/dashboard.data";

export default function Dashboard() {
  const [range, setRange] = useState<"12m" | "6m" | "3m">("6m");

  const filteredRevenue = useMemo(() => {
    if (range === "12m") return revenueData;
    if (range === "6m") return revenueData.slice(-6);
    return revenueData.slice(-3);
  }, [range]);

  return (
    <div className="space-y-6 pb-6">
      <DashboardHero />

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="mt-5 flex items-center justify-between">
          <TabsList className="seg bg-paper p-1 h-auto rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-ink-2 transition data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-sm border-transparent bg-transparent shadow-none">Tổng quan</TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-ink-2 transition data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-sm border-transparent bg-transparent shadow-none">Doanh thu</TabsTrigger>
            <TabsTrigger value="customers" className="rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-ink-2 transition data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-sm border-transparent bg-transparent shadow-none">Khách hàng</TabsTrigger>
          </TabsList>
          <div className="seg">
            <button className={range === "3m" ? "on" : ""} onClick={() => setRange("3m")}>3 tháng</button>
            <button className={range === "6m" ? "on" : ""} onClick={() => setRange("6m")}>6 tháng</button>
            <button className={range === "12m" ? "on" : ""} onClick={() => setRange("12m")}>12 tháng</button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <OverviewTab
            range={range}
            setRange={setRange}
            filteredRevenue={filteredRevenue}
          />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueTab />
        </TabsContent>

        <TabsContent value="customers">
          <CustomersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
