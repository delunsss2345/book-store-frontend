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
        <TabsList className="grid w-full grid-cols-3 md:w-[420px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

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
