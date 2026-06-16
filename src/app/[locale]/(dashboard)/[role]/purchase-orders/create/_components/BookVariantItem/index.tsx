import { Badge } from "@/src/components/ui/badge";
import { AdminBookVariantDetail } from "@/types/response/admin-book-variant.response";
import { Book } from "@/types/response/variant.response";
import { BookOpen } from "lucide-react";

type Props = {
  book: Book;
  variant: AdminBookVariantDetail;
  alreadyAdded?: boolean;
  onSelect?: (variant: AdminBookVariantDetail) => void;
};

export function BookVariantPurchaseItem({
  book,
  variant,
  alreadyAdded,
  onSelect,
}: Props) {
  const title = book?.translations?.[0]?.title;

  return (
    <div
      onClick={() => onSelect?.(variant)}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
        <BookOpen className="size-4 text-indigo-500" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>

        <p className="text-xs text-muted-foreground">
          {variant.format} • ISBN {variant.isbn} •{" "}
          {Number(variant.price).toLocaleString("vi-VN")}₫
        </p>
      </div>

      {alreadyAdded && (
        <Badge variant="secondary" className="text-[10px] h-5 shrink-0">
          Đã thêm
        </Badge>
      )}
    </div>
  );
}
