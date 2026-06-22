"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
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
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-[#FBFAF7] px-5 py-3">
        <span className="text-[13px] font-semibold text-ink">
          {t("dashboard.products.create.variant.formTitle")}
        </span>
        <span className="bdg bdg-gray">Form</span>
      </div>

      {/* Body */}
      <Form {...form}>
        <div className="space-y-5 p-5">
          {/* Block 1 — Thông tin cơ bản */}
          <div>
            <p className="eyebrow mb-3">
              {t("dashboard.products.create.variant.basicInfo")}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Format */}
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">
                      {t("dashboard.products.create.variant.formatLabel")}
                    </label>
                    <FormControl>
                      <select
                        className="field"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="PAPERBACK">
                          {t(
                            "dashboard.products.create.variant.formats.paperback"
                          )}
                        </option>
                        <option value="HARDCOVER">
                          {t(
                            "dashboard.products.create.variant.formats.hardcover"
                          )}
                        </option>
                        <option value="EBOOK">E-Book</option>
                        <option value="AUDIOBOOK">Audiobook</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">
                      {t("dashboard.products.create.variant.isbnLabel")}
                    </label>
                    <FormControl>
                      <input
                        className="field font-mono"
                        placeholder="978..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Hairline */}
          <div className="hairline" />

          {/* Block 2 — Giá & tái bản */}
          <div>
            <p className="eyebrow mb-3">
              {t("dashboard.products.create.variant.pricingAndEdition")}
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* Giá nhập */}
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">Giá nhập</label>
                    <FormControl>
                      <input
                        type="number"
                        className="field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />

              {/* Giá bán */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">
                      {t("dashboard.products.create.variant.priceLabel")}
                    </label>
                    <FormControl>
                      <input
                        type="number"
                        className="field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />

              {/* Tái bản */}
              <FormField
                control={form.control}
                name="edition"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">
                      {t("dashboard.products.create.variant.editionLabel")}
                    </label>
                    <FormControl>
                      <input
                        type="number"
                        className="field"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />

              {/* SL nhập */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <label className="flabel">Số lượng nhập</label>
                    <FormControl>
                      <input
                        type="number"
                        min={0}
                        className="field"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-accent" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="btn-soft rounded-lg px-3.5 py-2 text-[12.5px]"
            >
              <X className="h-4 w-4" />
              {t("dashboard.products.create.variant.cancel")}
            </button>
            <button
              type="button"
              onClick={form.handleSubmit(onSave, onError)}
              className="btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
            >
              <Check className="h-4 w-4" />
              {t("dashboard.products.create.variant.save")}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
