import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function FormatPrice() {
    const t = useTranslations();
    const bookVariantDetail = useCatalogStore((state) => state.bookVariantDetail);

    const formatted = useMemo(() => {
        const price = bookVariantDetail?.price;
        const currency = bookVariantDetail?.currencyCode;

        if (price == null || !currency) return null;

        const n = typeof price === "string" ? Number(price) : price;

        try {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
            }).format(n);
        } catch {
            return `${n.toLocaleString("vi-VN")} ${currency}`;
        }
    }, [bookVariantDetail?.price, bookVariantDetail?.currencyCode]);

    if (!formatted) {
        return <p className="text-lg font-semibold text-neutral-900">—</p>;
    }

    return (
        <div className="flex items-end gap-2">
            <p className="font-semibold text-3xl tracking-tight text-neutral-900">
                {formatted}
            </p>

            <span className="text-sm text-neutral-500">{t("detail.pricePerBook")}</span>
        </div>
    );
}
