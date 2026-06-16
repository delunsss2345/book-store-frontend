import { Button } from "@/src/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Plus, X } from "lucide-react";

interface AddressHeaderProps {
  t: any;
  isAddingAddress: boolean;
  onToggle: () => void;
}

export const AddressHeader = ({
  t,
  isAddingAddress,
  onToggle,
}: AddressHeaderProps) => {
  return (
    <CardHeader className="gap-4 border-b pb-6 sm:flex sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <CardTitle className="text-base">
          {t("profile.page.addressesTitle")}
        </CardTitle>
        <CardDescription>
          {t("profile.page.addressesDescription")}
        </CardDescription>
      </div>

      <Button
        type="button"
        variant={isAddingAddress ? "outline" : "default"}
        onClick={onToggle}
        className="shrink-0"
      >
        {isAddingAddress ? (
          <>
            <X className="mr-2 h-4 w-4" />
            {t("profile.page.hideAddressForm")}
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            {t("profile.page.addAddress")}
          </>
        )}
      </Button>
    </CardHeader>
  );
};
