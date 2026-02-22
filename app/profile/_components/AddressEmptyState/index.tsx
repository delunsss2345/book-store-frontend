interface AddressEmptyStateProps {
  t: any;
}

export const AddressEmptyState = ({ t }: AddressEmptyStateProps) => (
  <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
    <p className="text-sm font-medium">
      {t("profile.page.emptyAddressesTitle")}
    </p>
    <p className="mt-2 text-sm text-muted-foreground">
      {t("profile.page.emptyAddressesDescription")}
    </p>
  </div>
);
