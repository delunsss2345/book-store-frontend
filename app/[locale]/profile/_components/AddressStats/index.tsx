import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface AddressStatsProps {
  totalAddresses: number;
  defaultAddress: any; // Thay bằng type Address của bạn
  formatAddress: (address: any) => string;
  t: any;
}

export const AddressStats = ({
  totalAddresses,
  defaultAddress,
  formatAddress,
  t,
}: AddressStatsProps) => {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-base">
          {t("profile.page.addressStatsTitle")}
        </CardTitle>
        <CardDescription>
          {t("profile.page.addressStatsDescription")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Addresses */}
        <div className="rounded-lg border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            {t("profile.page.totalAddresses")}
          </p>
          <p className="mt-2 text-2xl font-semibold">{totalAddresses}</p>
        </div>

        {/* Default Address Summary */}
        <div className="rounded-lg border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            {t("profile.page.defaultAddress")}
          </p>
          <p className="mt-2 text-sm font-medium">
            {defaultAddress?.recipientName ||
              t("profile.page.noneDefaultAddress")}
          </p>
          {defaultAddress && (
            <p className="mt-1 text-xs text-muted-foreground">
              {formatAddress(defaultAddress)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
