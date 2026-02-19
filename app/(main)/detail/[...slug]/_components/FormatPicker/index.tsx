import { Button } from "@/components/ui/button";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { cn } from "@/lib/utils";
import { BookVariant } from "@/types/response/catalog.response";
import * as React from "react";


export function FormatPicker({
    variants,
    onChange
}: {
    variants: BookVariant[];
    onChange: (bookVariant: BookVariant) => void
}) {
    const bookVariantDetail = useCatalogStore((state) => state.bookVariantDetail);
    const formats = React.useMemo(() => {
        return Array.from(new Set(variants.map((v) => v.format).filter(Boolean)));
    }, [variants]);

    if (formats.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-700">Format:</span>

            <div className="flex gap-2">
                {formats.map((format, idx) => {
                    const isActive = bookVariantDetail?.format === format;

                    return (
                        <Button
                            key={format}
                            type="button"
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            className={cn("h-7 px-2 text-xs", isActive && "cursor-default")}
                            onClick={() => {
                                onChange(variants[idx])
                            }}
                            aria-pressed={isActive}
                        >
                            {format}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
