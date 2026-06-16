import { cn } from "@/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { UserAddressData } from "@/types/response/user-address.response";
import { MapPin, Pencil, Trash2 } from "lucide-react"; // Thêm icon mới

interface AddressCardProps {
  address: UserAddressData; // Thay 'any' bằng Interface Address của Huy
  t: any;
  formatAddress: (address: any) => string;
  onSetDefault: (id: string) => void;
  onEdit: (address: any) => void; // Thêm prop callback chỉnh sửa
  onDelete: (id: string) => void; // Thêm prop callback xóa
}

export const AddressCard = ({
  address,
  t,
  formatAddress,
  onSetDefault,
  onEdit,
  onDelete,
}: AddressCardProps) => {
  return (
    <article
      className={cn(
        "group relative rounded-xl border p-4 transition-all hover:shadow-sm", // Thêm hiệu ứng hover
        address.isDefault
          ? "border-primary/40 bg-primary/5"
          : "bg-card hover:border-muted-foreground/30",
      )}
    >
      {/* Header: Loại địa chỉ & Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            {t(`profile.page.addressTypes.${address.addressType}`)}
          </Badge>
          {address.isDefault && (
            <Badge
              variant="default"
              className="bg-primary/90 text-[10px] uppercase tracking-wider"
            >
              {t("profile.page.defaultBadge")}
            </Badge>
          )}
        </div>

        {/* Nút Sửa & Xóa: Xuất hiện tinh tế hơn */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit(address)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(address.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Thông tin người nhận */}
      <div className="mt-3">
        <p className="text-sm font-bold tracking-tight">
          {address.recipientName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {address.phoneNumber}
        </p>
      </div>

      {/* Địa chỉ chi tiết */}
      <div className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-foreground/80">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
        <span className="line-clamp-2">{formatAddress(address)}</span>
      </div>

      {/* Action Footer: Nút thiết lập mặc định */}
      {!address.isDefault && (
        <div className="mt-4 pt-3 border-t border-dashed">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs font-medium text-primary hover:bg-transparent hover:underline"
            onClick={() => onSetDefault(address.id)}
          >
            {t("profile.page.setAsDefault")}
          </Button>
        </div>
      )}
    </article>
  );
};
