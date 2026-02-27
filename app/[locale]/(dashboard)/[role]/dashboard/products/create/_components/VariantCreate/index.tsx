"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { AdminBookVariant } from "@/types/response/admin.response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VariantItem from "./VariantItem";
import { Separator } from "@/components/ui/separator";

const getAdminBookVariantSchema = (t: (key: string) => string) =>
  z.object({
    format: z
      .enum(["PAPERBACK", "HARDCOVER", "EBOOK", "AUDIOBOOK"])
      .or(z.string()),
    edition: z.number(),
    isbn: z.string().min(1, t("dashboard.products.create.variant.validation.isbnRequired")),
    costPrice: z
      .string()
      .min(1, t("dashboard.products.create.variant.validation.costPriceRequired")),
    price: z
      .string()
      .min(1, t("dashboard.products.create.variant.validation.priceRequired")),
    currencyCode: z
      .string()
      .min(1, t("dashboard.products.create.variant.validation.currencyCodeRequired")),
    stock: z.number(),
    isActive: z.boolean(),
  });

type AdminBookVariantForm = z.infer<ReturnType<typeof getAdminBookVariantSchema>>;

export default function VariantCreate({
  variants,
  setVariants,
}: {
  variants: AdminBookVariant[];
  setVariants: (variants: AdminBookVariant[]) => void;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const adminBookVariantSchema = useMemo(() => getAdminBookVariantSchema(t), [t]);

  const form = useForm<AdminBookVariantForm>({
    resolver: zodResolver(adminBookVariantSchema),
    defaultValues: {
      format: "PAPERBACK",
      edition: 1,
      stock: 50,
      isActive: true,
      currencyCode: "VND",
    },
  });

  const onSaveVariant = (data: AdminBookVariantForm) => {
    if (variants) {
      const newVariant: AdminBookVariant = {
        id: crypto.randomUUID(),
        ...data,
      };
      setVariants([...variants, newVariant]);
      setIsOpen(false);
      form.reset();
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <div className="space-y-5">
      {/* LIST */}
      <div className="space-y-3">
        {variants?.length ? (
          variants.map((v) => (
            <VariantItem
              key={v.id}
              v={v}
              setVariants={setVariants}
              variants={variants}
            />
          ))
        ) : (
          <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
            {t("dashboard.products.create.variant.empty")}
          </div>
        )}
      </div>

      {!isOpen ? (
        <Button
          variant="outline"
          className="w-full h-20 border-dashed border-2 text-muted-foreground hover:text-emerald-700 hover:border-emerald-600 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 size-5" /> {t("dashboard.products.create.variant.addNew")}
        </Button>
      ) : (
        <Card className="border-emerald-200 bg-emerald-50/10">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{t("dashboard.products.create.variant.formTitle")}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Form
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-5 lg:p-6">
            <Form {...form}>
              <div className="space-y-6">
                {/* Block 1 */}
                <div className="rounded-xl border bg-background p-4 space-y-4">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    {t("dashboard.products.create.variant.basicInfo")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dashboard.products.create.variant.formatLabel")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectItem value="PAPERBACK">
                                {t("dashboard.products.create.variant.formats.paperback")}
                              </SelectItem>
                              <SelectItem value="HARDCOVER">
                                {t("dashboard.products.create.variant.formats.hardcover")}
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
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dashboard.products.create.variant.stockLabel")}</FormLabel>
                          <FormControl>
                            <Input type="number" className="h-10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isbn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dashboard.products.create.variant.isbnLabel")}</FormLabel>
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
                <div className="rounded-xl border bg-background p-4 space-y-4">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    {t("dashboard.products.create.variant.pricingAndEdition")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="costPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dashboard.products.create.variant.costPriceLabel")}</FormLabel>
                          <FormControl>
                            <Input type="number" className="h-10" {...field} />
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
                              className="h-10 border-emerald-200"
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
                          <FormLabel>{t("dashboard.products.create.variant.editionLabel")}</FormLabel>
                          <FormControl>
                            <Input type="number" className="h-10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                    }}
                  >
                    <X className="mr-2 size-4" /> {t("dashboard.products.create.variant.cancel")}
                  </Button>

                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSaveVariant, onError)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="mr-2 size-4" /> {t("dashboard.products.create.variant.save")}
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
