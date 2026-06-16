"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/src/components/ui/card";

import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth/store/auth.store";
import useTranslator from "@/hooks/use-translator";

import {
  useDeleteUserAddressMutation,
  useSetDefaultAddressMutation,
} from "@/features/user-address";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import { AddressEmptyState } from "./_components/AddressEmptyState";
import { AddressForm } from "./_components/AddressFrom";
import { AddressHeader } from "./_components/AddressHeader";
import { AddressList } from "./_components/AddressList";
import { AddressStats } from "./_components/AddressStats";
import { ProfileOverview } from "./_components/ProfileOverview";

const ADDRESS_TYPES = ["HOME", "OFFICE", "OTHER"] as const;

type AddressType = (typeof ADDRESS_TYPES)[number];

type AddressItem = {
  id: string;
  addressType: AddressType;
  recipientName: string;
  phoneNumber: string;
  addressDetail: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
};

type AddressFormState = {
  addressType: AddressType;
  recipientName: string;
  phoneNumber: string;
  addressDetail: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
};

const getEmptyAddressForm = (): AddressFormState => ({
  addressType: "HOME",
  recipientName: "",
  phoneNumber: "",
  addressDetail: "",
  ward: "",
  district: "",
  city: "",
  isDefault: false,
});

const isAddressType = (value: string): value is AddressType =>
  ADDRESS_TYPES.includes(value as AddressType);

const generateAddressId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const formatAddress = (address: AddressItem) =>
  [address.addressDetail, address.ward, address.district, address.city]
    .filter(Boolean)
    .join(", ");

const ProfilePage = () => {
  const { t } = useTranslator();
  const currentUser = useAuthStore(selectorCurrentUser);
  const { data: addresses } = useQueryAddress();
  const { mutateAsync: setDefaultAddress } = useSetDefaultAddressMutation();
  const { mutateAsync: deleteAddress } = useDeleteUserAddressMutation();
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const fullName = useMemo(() => {
    if (!currentUser) return "N/A";
    const formattedName =
      `${currentUser.firstName} ${currentUser.lastName}`.trim();
    return formattedName || "N/A";
  }, [currentUser]);

  const defaultAddress = useMemo(
    () => addresses?.find((address) => address.isDefault) ?? null,
    [addresses],
  );

  const handleSetDefaultAddress = (addressId: string) => {
    setDefaultAddress(addressId);
  };

  const handleEditAddress = (address: AddressItem) => {
    // TODO: Implement edit address
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId);
  };

  const handleCancelAddAddress = () => {
    setIsAddingAddress(false);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="font-semibold tracking-tight">
            {t("profile.page.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("profile.page.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ProfileOverview
            fullName={fullName}
            email={currentUser?.email}
            phoneNumber={currentUser?.phoneNumber}
            t={t}
          />

          <AddressStats
            totalAddresses={addresses?.length ?? 0}
            defaultAddress={defaultAddress}
            formatAddress={formatAddress}
            t={t}
          />
        </div>

        <Card className="mt-6 border-border/70">
          <AddressHeader
            t={t}
            isAddingAddress={isAddingAddress}
            onToggle={() => setIsAddingAddress(!isAddingAddress)}
          />

          <CardContent className="space-y-5 pt-6">
            {isAddingAddress ? (
              <AddressForm
                onToggle={() => setIsAddingAddress(!isAddingAddress)}
              />
            ) : null}

            {addresses?.length === 0 ? (
              <AddressEmptyState t={t} />
            ) : (
              <AddressList
                t={t}
                addresses={addresses ?? []}
                formatAddress={formatAddress}
                onSetDefault={handleSetDefaultAddress}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;
