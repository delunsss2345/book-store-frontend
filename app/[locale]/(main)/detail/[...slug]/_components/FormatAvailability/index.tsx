import { Badge } from "@/components/ui/badge";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";

export function FormatAvailability() {
  const bookVariantDetail = useCatalogStore((s) => s.bookVariantDetail);
  const available = bookVariantDetail?.available ?? 0;

  const status =
    available > 10
      ? "In available"
      : available > 0
        ? `Only ${available} left`
        : "Out of available";

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-neutral-600">Availability</span>

      <Badge
        variant={available > 0 ? "secondary" : "destructive"}
        className="rounded-full"
      >
        {status}
      </Badge>
    </div>
  );
}
