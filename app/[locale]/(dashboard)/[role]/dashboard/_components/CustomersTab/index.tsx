"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { numberFmt } from "../dashboard.data";

export function CustomersTab() {
  return (
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
  );
}
