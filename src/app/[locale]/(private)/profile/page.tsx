"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/src/components/ui/card";

import { useQueryMe } from "@/features/auth/hooks/use-query-me";
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
import { ListSkeleton } from "@/src/components/common/Skeletons";

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

const formatAddress = (address: AddressItem) =>
  [address.addressDetail, address.ward, address.district, address.city]
    .filter(Boolean)
    .join(", ");

const ProfilePage = () => {
  const { t } = useTranslator();
  const { data } = useQueryMe();
  const currentUser = data?.data;
  const { data: addresses, isPending: isAddressesLoading } = useQueryAddress();
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
    <div className="bg-paper min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6">
          <h1 className="display text-[28px] font-semibold tracking-tight">
            {t("profile.page.title")}
          </h1>
          <p className="mt-2 text-[14px] text-ink-2">
            {t("profile.page.subtitle")}
          </p>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
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

        <div className="card mt-6">
          <AddressHeader t={t} />

          <div className="p-6">
            {isAddressesLoading ? (
              <ListSkeleton count={2} />
            ) : addresses?.length === 0 ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
