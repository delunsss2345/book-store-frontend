"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
          variants.map((v) => (
            <VariantItem
              key={v.id}
              v={v}
              setVariants={setVariants}
              variants={variants}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed bg-zinc-50 p-4 text-sm text-muted-foreground">
            {t("dashboard.products.create.variant.empty")}
          </div>
        )}
      </div>

      {!isOpen ? (
        <Button
          variant="outline"
          className="h-14 w-full rounded-xl border-2 border-dashed border-zinc-300 text-muted-foreground transition-all hover:border-emerald-600 hover:text-emerald-700"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 size-5" />
          {t("dashboard.products.create.variant.addNew")}
        </Button>
      ) : (
        <VariantForm form={form} onSave={onSaveVariant} onCancel={onCancel} />
      )}
    </div>
  );
}
