import { AdminBookVariant } from "@/types/response/admin.response";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface VariantItemProps {
  v: AdminBookVariant;
  setVariants: (variants: AdminBookVariant[]) => void;
  variants: AdminBookVariant[];
}

export default function VariantItem({
  v,
  setVariants,
  variants,
}: VariantItemProps) {
  return (
    <div
      key={v.id}
      className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm"
    >
      <div className="flex gap-4 items-center">
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {v.format}
        </Badge>
        <div>
          <p className="text-sm font-bold">
            {v.price} {v.currencyCode}
          </p>
          <p className="text-xs text-muted-foreground">
            ISBN: {v.isbn} • Kho: {v.stock}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
      >
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  );
}
