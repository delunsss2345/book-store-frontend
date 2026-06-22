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
    <div className="card p-6">
      <h3 className="text-[15px] font-semibold">
        {t("profile.page.addressStatsTitle")}
      </h3>
      <p className="mt-1 text-[13px] text-ink-3">
        {t("profile.page.addressStatsDescription")}
      </p>

      <div className="mt-4 space-y-4">
        {/* Total Addresses */}
        <div className="rounded-lg border border-line bg-paper/50 p-4">
          <p className="text-[13px] text-ink-3">
            {t("profile.page.totalAddresses")}
          </p>
          <p className="display mt-2 text-[26px] font-semibold">{totalAddresses}</p>
        </div>

        {/* Default Address Summary */}
        <div className="rounded-lg border border-line bg-paper/50 p-4">
          <p className="text-[13px] text-ink-3">
            {t("profile.page.defaultAddress")}
          </p>
          <p className="mt-2 text-[14px] font-medium text-ink">
            {defaultAddress?.recipientName || t("profile.page.noneDefaultAddress")}
          </p>
          {defaultAddress && (
            <p className="mt-1 text-[12px] text-ink-3">
              {formatAddress(defaultAddress)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
