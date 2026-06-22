"use client";

import { AdminBookVariant } from "@/types/response/admin.response";
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
    <tr>
      <td>
        <span className="bdg bdg-gray">{v.format}</span>
      </td>
      <td className="font-mono text-[12px]">{v.isbn || "N/A"}</td>
      <td>{v.costPrice} {v.currencyCode}</td>
      <td className="font-semibold text-ink">{v.price} {v.currencyCode}</td>
      <td>{v.stock}</td>
      <td className="text-right">
        <button 
          className="icon-btn h-8 w-8 text-accent hover:border-accent hover:text-accent"
          onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
          title="Xóa biến thể"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </td>
    </tr>
  );
}
