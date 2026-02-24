"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth/store/auth.store";
import useTranslator from "@/hooks/use-translator";

import { AddressForm } from "./_components/AddressFrom";
import { AddressEmptyState } from "./_components/AddressEmptyState";
import { AddressList } from "./_components/AddressList";
import { AddressHeader } from "./_components/AddressHeader";
import { ProfileOverview } from "./_components/ProfileOverview";
import { AddressStats } from "./_components/AddressStats";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import { useUserAddressStore } from "@/features/user-address/store/user-address.store";

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

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressFormState>(() =>
    getEmptyAddressForm(),
  );
  const [formError, setFormError] = useState<string | null>(null);

  const fullName = useMemo(() => {
    if (!currentUser) return "N/A";
    const formattedName =
      `${currentUser.firstName} ${currentUser.lastName}`.trim();
    return formattedName || "N/A";
  }, [currentUser]);

  // const defaultAddress = useMemo(
  //   () => addresses.find((address) => address.isDefault) ?? null,
  //   [addresses],
  // );

  const handleInputChange =
    (field: keyof Omit<AddressFormState, "addressType" | "isDefault">) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setAddressForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleAddAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      addressForm.recipientName,
      addressForm.phoneNumber,
      addressForm.addressDetail,
      addressForm.ward,
      addressForm.district,
      addressForm.city,
    ];

    const hasEmptyField = requiredValues.some((value) => !value.trim());
    if (hasEmptyField) {
      setFormError(t("profile.page.form.requiredError"));
      return;
    }

    const nextAddress: Omit<AddressItem, "isDefault"> = {
      id: generateAddressId(),
      addressType: addressForm.addressType,
      recipientName: addressForm.recipientName.trim(),
      phoneNumber: addressForm.phoneNumber.trim(),
      addressDetail: addressForm.addressDetail.trim(),
      ward: addressForm.ward.trim(),
      district: addressForm.district.trim(),
      city: addressForm.city.trim(),
    };

    // setAddresses((prev) => {
    //   const shouldBeDefault = addressForm.isDefault || prev.length === 0;
    //   const addressToInsert: AddressItem = {
    //     ...nextAddress,
    //     isDefault: shouldBeDefault,
    //   };

    //   if (!shouldBeDefault) {
    //     return [...prev, addressToInsert];
    //   }

    //   return [
    //     ...prev.map((address) => ({ ...address, isDefault: false })),
    //     addressToInsert,
    //   ];
    // });

    setAddressForm(getEmptyAddressForm());
    setFormError(null);
    setIsAddingAddress(false);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    console.log(addressId);
  };

  const handleCancelAddAddress = () => {
    setAddressForm(getEmptyAddressForm());
    setFormError(null);
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
            // defaultAddress={defaultAddress}
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
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;
