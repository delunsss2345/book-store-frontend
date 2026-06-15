"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type { AdminBookVariantForm } from "../variant.schema";

export default function VariantForm({
  form,
  onSave,
  onCancel,
}: {
  form: UseFormReturn<AdminBookVariantForm>;
  onSave: (data: AdminBookVariantForm) => void;
  onCancel: () => void;
}) {
  const t = useTranslations();

  const onError = (error: unknown) => {
    console.log(error);
  };

  return (
    <Card className="overflow-hidden border-emerald-200 bg-emerald-50/30">
      <CardHeader className="border-b bg-white/70 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">
            {t("dashboard.products.create.variant.formTitle")}
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-white text-[10px] uppercase tracking-wide"
          >
            Form
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <Form {...form}>
          <div className="space-y-6">
            {/* Block 1 */}
            <div className="space-y-4 rounded-xl border bg-white p-4">
              <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {t("dashboard.products.create.variant.basicInfo")}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("dashboard.products.create.variant.formatLabel")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="PAPERBACK">
                            {t(
                              "dashboard.products.create.variant.formats.paperback",
                            )}
                          </SelectItem>
                          <SelectItem value="HARDCOVER">
                            {t(
                              "dashboard.products.create.variant.formats.hardcover",
                            )}
                          </SelectItem>
                          <SelectItem value="EBOOK">E-Book</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("dashboard.products.create.variant.isbnLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="978..."
                          className="h-10 font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Block 2 */}
            <div className="space-y-4 rounded-xl border bg-white p-4">
              <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {t("dashboard.products.create.variant.pricingAndEdition")}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-700 font-bold">
                        Giá nhập
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-10 border-emerald-200 bg-emerald-50/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-700 font-bold">
                        {t("dashboard.products.create.variant.priceLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-10 border-emerald-200 bg-emerald-50/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="edition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("dashboard.products.create.variant.editionLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-10"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>So luong nhap</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          className="h-10"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <Button
                variant="ghost"
                type="button"
                onClick={onCancel}
                className="rounded-xl"
              >
                <X className="mr-2 size-4" />
                {t("dashboard.products.create.variant.cancel")}
              </Button>

              <Button
                type="button"
                onClick={form.handleSubmit(onSave, onError)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="mr-2 size-4" />
                {t("dashboard.products.create.variant.save")}
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
