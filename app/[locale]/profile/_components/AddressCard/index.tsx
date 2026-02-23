import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddressCardProps {
  address: any; // Thay 'any' bằng Interface Address của Huy
  t: any;
  formatAddress: (address: any) => string;
  onSetDefault: (id: string) => void;
}

export const AddressCard = ({
  address,
  t,
  formatAddress,
  onSetDefault,
}: AddressCardProps) => {
  return (
    <article
      className={cn(
        "rounded-xl border p-4 transition-colors",
        address.isDefault ? "border-primary/40 bg-primary/5" : "bg-background",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {t(`profile.page.addressTypes.${address.addressType}`)}
        </Badge>
        {address.isDefault && <Badge>{t("profile.page.defaultBadge")}</Badge>}
      </div>

      <p className="mt-4 text-sm font-semibold">{address.recipientName}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {address.phoneNumber}
      </p>

      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <span>{formatAddress(address)}</span>
      </p>

      {!address.isDefault && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => onSetDefault(address.id)}
        >
          {t("profile.page.setAsDefault")}
        </Button>
      )}
    </article>
  );
};
