import { Badge } from "@/components/ui/badge";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";

export function FormatAvailability() {
    const bookVariantDetail = useCatalogStore((s) => s.bookVariantDetail);
    const stock = bookVariantDetail?.stock ?? 0;

    const status =
        stock > 10 ? "In stock" : stock > 0 ? `Only ${stock} left` : "Out of stock";

    return (
        <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-600">Availability</span>

            <Badge
                variant={stock > 0 ? "secondary" : "destructive"}
                className="rounded-full"
            >
                {status}
            </Badge>
        </div>
    );
}
