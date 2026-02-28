"use client";

import { Ruler, Tag, Plus, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

export const PhysicalSpecsCard = ({ data }: { data?: any }) => {
  const t = useTranslations();

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Ruler className="size-5 text-slate-500" />
            <CardTitle className="text-xs uppercase tracking-widest text-slate-700">
              {t("dashboard.products.create.physicalSpecs.title")}
            </CardTitle>
          </div>

          <Badge variant="outline" className="text-xs">
            Specs
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Kích thước & Trọng lượng */}
        <div className="rounded-xl border bg-background p-3 space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold">
              {t("dashboard.products.create.physicalSpecs.dimensionLabel")}
            </Label>
            <span className="text-[11px] text-muted-foreground">
              {t("dashboard.products.create.physicalSpecs.dimensionHint")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SpecInput
              label={t("dashboard.products.create.physicalSpecs.widthLabel")}
              name="width"
              defaultValue={data?.width}
            />
            <SpecInput
              label={t("dashboard.products.create.physicalSpecs.heightLabel")}
              name="height"
              defaultValue={data?.height}
            />
            <SpecInput
              label={t(
                "dashboard.products.create.physicalSpecs.thicknessLabel",
              )}
              name="thickness"
              defaultValue={data?.thickness}
            />
            <SpecInput
              label={t("dashboard.products.create.physicalSpecs.weightLabel")}
              name="weight"
              defaultValue={data?.weight}
              isBold
            />
          </div>
        </div>

        <Separator />

        {/* Info */}
        <div className="space-y-3 pt-1">
          <Label className="text-xs font-bold">
            {t("dashboard.products.create.physicalSpecs.publishLabel")}
          </Label>

          <FullWidthInput
            label={t("dashboard.products.create.physicalSpecs.authorLabel")}
            placeholder={t(
              "dashboard.products.create.physicalSpecs.authorPlaceholder",
            )}
            defaultValue={data?.authors}
          />
          <FullWidthInput
            label={t("dashboard.products.create.physicalSpecs.publisherLabel")}
            placeholder={t(
              "dashboard.products.create.physicalSpecs.publisherPlaceholder",
            )}
            defaultValue={data?.publisher}
          />

          <div className="grid grid-cols-2 gap-3">
            <FullWidthInput
              label={t(
                "dashboard.products.create.physicalSpecs.publishYearLabel",
              )}
              type="number"
              defaultValue={data?.year}
            />
            <FullWidthInput
              label={t(
                "dashboard.products.create.physicalSpecs.pageCountLabel",
              )}
              type="number"
              defaultValue={data?.pages}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-bold flex items-center gap-2">
            <Tag className="size-3 text-primary" />{" "}
            {t("dashboard.products.create.physicalSpecs.badgesLabel")}
          </Label>

          <div className="flex flex-wrap gap-2">
            {[
              t("dashboard.products.create.physicalSpecs.badges.bestSeller"),
              t("dashboard.products.create.physicalSpecs.badges.newArrival"),
            ].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-muted/20 cursor-pointer hover:bg-muted"
              >
                {tag}
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[10px] border-dashed border"
            >
              <Plus className="size-3 mr-1" />{" "}
              {t("dashboard.products.create.physicalSpecs.addBadge")}
            </Button>
          </div>
        </div>
      </CardContent>

      <FooterAlert
        text={t.rich("dashboard.products.create.physicalSpecs.footerAlert", {
          b: (chunks) => <b>{chunks}</b>,
        })}
      />
    </Card>
  );
};

const SpecInput = ({ label, isBold, ...props }: any) => (
  <div className="space-y-1.5">
    <Label className="text-[11px] font-bold text-muted-foreground uppercase">
      {label}
    </Label>
    <Input
      type="number"
      step="0.1"
      className={`h-9 ${isBold ? "font-bold" : ""}`}
      {...props}
    />
  </div>
);

const FullWidthInput = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <Label className="text-xs font-bold">{label}</Label>
    <Input className="h-9" {...props} />
  </div>
);

const FooterAlert = ({ text }: { text: ReactNode }) => (
  <div className="p-4 bg-amber-50 border-t flex gap-3">
    <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
    <p className="text-[11px] text-amber-800 leading-normal font-medium">
      {text}
    </p>
  </div>
);
