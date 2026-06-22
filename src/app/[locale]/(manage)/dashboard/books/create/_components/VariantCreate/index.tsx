"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import { AdminBookVariant } from "@/types/response/admin.response";
import {
  AdminBookVariantForm,
  getAdminBookVariantSchema,
} from "./variant.schema";
import VariantForm from "./VariantForm";
import VariantItem from "./VariantItem";

export default function VariantCreate({
  variants,
  setVariants,
}: {
  variants: AdminBookVariant[];
  setVariants: (variants: AdminBookVariant[]) => void;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const adminBookVariantSchema = useMemo(
    () => getAdminBookVariantSchema(t),
    [t],
  );

  const form = useForm<AdminBookVariantForm>({
    resolver: zodResolver(adminBookVariantSchema),
    defaultValues: {
      format: "PAPERBACK",
      edition: 1,
      stock: 0,
      price: "",
      costPrice: "",
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

  const onCancel = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-4">
      {/* LIST */}
      <div className="space-y-3">
        {variants?.length ? (
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Định dạng</th>
                  <th>ISBN</th>
                  <th>Giá nhập</th>
                  <th>Giá bán</th>
                  <th>SL nhập</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <VariantItem
                    key={v.id}
                    v={v}
                    setVariants={setVariants}
                    variants={variants}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-zinc-50 p-4 text-sm text-muted-foreground">
            {t("dashboard.products.create.variant.empty")}
          </div>
        )}
      </div>

      {!isOpen ? (
        <button
          type="button"
          className="btn-soft mt-3 rounded-lg px-3.5 py-2 text-[12.5px]"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {t("dashboard.products.create.variant.addNew")}
        </button>
      ) : (
        <VariantForm form={form} onSave={onSaveVariant} onCancel={onCancel} />
      )}
    </div>
  );
}
