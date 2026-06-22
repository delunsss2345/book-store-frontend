"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { PurchaseOrderSchemaType } from "@/validation/supplier/supplier.validation";
import { CalendarDays, ClipboardList, FileText, Truck } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

type SupplierOption = { id: number | string; name: string };

export function OrderInfoCard({
  form,
  suppliers,
  supplierPending,
}: {
  form: UseFormReturn<PurchaseOrderSchemaType>;
  suppliers?: SupplierOption[];
  supplierPending: boolean;
}) {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b py-3 px-4">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <ClipboardList className="size-4 text-indigo-500" />
          <CardTitle className="text-sm font-semibold">
            Thông tin chung
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nhà cung cấp <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Chọn nhà cung cấp..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!supplierPending &&
                      suppliers?.map((s) => (
                        <SelectItem
                          key={s.id}
                          value={String(s.id)}
                          className="text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Truck className="size-3.5 text-muted-foreground" />
                            {s.name}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mã đơn nhập
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    className="h-9 text-sm bg-slate-50 dark:bg-slate-900 font-mono cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  Ngày nhập
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="h-9 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="size-3.5" />
                  Ghi chú
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Nhập ghi chú cho đơn nhập hàng..."
                    className="min-h-20 text-sm resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
