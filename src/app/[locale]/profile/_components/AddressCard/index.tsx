import { cn } from "@/lib/utils";
import { UserAddressData } from "@/types/response/user-address.response";
import { MapPin, Pencil, Trash2 } from "lucide-react";

interface AddressCardProps {
  address: UserAddressData;
  t: any;
  formatAddress: (address: any) => string;
  onSetDefault: (id: string) => void;
  onEdit: (address: any) => void;
  onDelete: (id: string) => void;
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
        "rounded-xl border p-4 transition-all hover:shadow-sm",
        address.isDefault
          ? "border-accent/40 bg-accent-soft/40"
          : "border-line bg-surface"
      )}
    >
      {/* Header: Loại địa chỉ & Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="chip border border-line bg-surface text-ink-2">
            {t(`profile.page.addressTypes.${address.addressType}`)}
          </span>
          {address.isDefault && (
            <span className="chip bg-accent text-white">
              {t("profile.page.defaultBadge")}
            </span>
          )}
        </div>

        {/* Nút Sửa & Xóa */}
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(address)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:text-ink transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:text-accent transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Thông tin người nhận */}
      <p className="mt-3 text-[14px] font-bold tracking-tight text-ink">
        {address.recipientName}
      </p>
      <p className="mt-0.5 text-[12px] text-ink-3">
        {address.phoneNumber}
      </p>

      {/* Địa chỉ chi tiết */}
      <div className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-ink-2">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />
        <span className="line-clamp-2">{formatAddress(address)}</span>
      </div>

      {/* Action Footer: Nút thiết lập mặc định */}
      {!address.isDefault && (
        <div className="mt-4 border-t border-dashed border-line pt-3">
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-[12px] font-medium text-accent hover:underline"
          >
            {t("profile.page.setAsDefault")}
          </button>
        </div>
      )}
    </article>
  );
};
