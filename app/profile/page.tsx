"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Mail, MapPin, Phone, Plus, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorCurrentUser } from "@/features/selector";
import useTranslator from "@/hooks/use-translator";
import { cn } from "@/lib/utils";

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
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
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

  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressFormState>(() =>
    getEmptyAddressForm(),
  );
  const [formError, setFormError] = useState<string | null>(null);

  const fullName = useMemo(() => {
    if (!currentUser) return "N/A";

    const formattedName = `${currentUser.firstName} ${currentUser.lastName}`.trim();
    return formattedName || "N/A";
  }, [currentUser]);

  const defaultAddress = useMemo(
    () => addresses.find((address) => address.isDefault) ?? null,
    [addresses],
  );

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

    setAddresses((prev) => {
      const shouldBeDefault = addressForm.isDefault || prev.length === 0;
      const addressToInsert: AddressItem = {
        ...nextAddress,
        isDefault: shouldBeDefault,
      };

      if (!shouldBeDefault) {
        return [...prev, addressToInsert];
      }

      return [
        ...prev.map((address) => ({ ...address, isDefault: false })),
        addressToInsert,
      ];
    });

    setAddressForm(getEmptyAddressForm());
    setFormError(null);
    setIsAddingAddress(false);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    );
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
          <h1 className="font-semibold tracking-tight">{t("profile.page.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("profile.page.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="overflow-hidden border-border/70 py-0">
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 px-6 py-7 text-zinc-100">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">
                {t("profile.page.overviewTag")}
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">{fullName}</p>
              <p className="mt-2 text-sm text-zinc-200">{currentUser?.email ?? "N/A"}</p>
            </div>

            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{t("profile.page.nameLabel")}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{fullName}</p>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{t("profile.page.emailLabel")}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{currentUser?.email ?? "N/A"}</p>
              </div>

              <div className="rounded-lg border bg-background p-4 sm:col-span-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{t("profile.page.phoneLabel")}</span>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {currentUser?.phoneNumber || t("profile.page.notProvided")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base">{t("profile.page.addressStatsTitle")}</CardTitle>
              <CardDescription>{t("profile.page.addressStatsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-background p-4">
                <p className="text-sm text-muted-foreground">{t("profile.page.totalAddresses")}</p>
                <p className="mt-2 text-2xl font-semibold">{addresses.length}</p>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <p className="text-sm text-muted-foreground">{t("profile.page.defaultAddress")}</p>
                <p className="mt-2 text-sm font-medium">
                  {defaultAddress?.recipientName || t("profile.page.noneDefaultAddress")}
                </p>
                {defaultAddress ? (
                  <p className="mt-1 text-xs text-muted-foreground">{formatAddress(defaultAddress)}</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-border/70">
          <CardHeader className="gap-4 border-b pb-6 sm:flex sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">{t("profile.page.addressesTitle")}</CardTitle>
              <CardDescription>{t("profile.page.addressesDescription")}</CardDescription>
            </div>
            <Button
              type="button"
              variant={isAddingAddress ? "outline" : "default"}
              onClick={() => {
                if (isAddingAddress) {
                  handleCancelAddAddress();
                  return;
                }

                setFormError(null);
                setIsAddingAddress(true);
              }}
            >
              <Plus className="h-4 w-4" />
              {isAddingAddress ? t("profile.page.hideAddressForm") : t("profile.page.addAddress")}
            </Button>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            {isAddingAddress ? (
              <form
                onSubmit={handleAddAddress}
                className="rounded-xl border bg-muted/20 p-5"
                noValidate
              >
                <div className="mb-4">
                  <p className="text-sm font-semibold">{t("profile.page.form.title")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("profile.page.form.description")}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="addressType">{t("profile.page.form.addressTypeLabel")}</Label>
                    <Select
                      value={addressForm.addressType}
                      onValueChange={(value) => {
                        if (!isAddressType(value)) return;
                        setAddressForm((prev) => ({ ...prev, addressType: value }));
                      }}
                    >
                      <SelectTrigger id="addressType" className="mt-1.5 w-full">
                        <SelectValue placeholder={t("profile.page.form.addressTypeLabel")} />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {ADDRESS_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`profile.page.addressTypes.${type}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="recipientName">{t("profile.page.form.recipientNameLabel")}</Label>
                    <Input
                      id="recipientName"
                      value={addressForm.recipientName}
                      onChange={handleInputChange("recipientName")}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">{t("profile.page.form.phoneNumberLabel")}</Label>
                    <Input
                      id="phoneNumber"
                      value={addressForm.phoneNumber}
                      onChange={handleInputChange("phoneNumber")}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="addressDetail">{t("profile.page.form.addressDetailLabel")}</Label>
                    <Input
                      id="addressDetail"
                      value={addressForm.addressDetail}
                      onChange={handleInputChange("addressDetail")}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ward">{t("profile.page.form.wardLabel")}</Label>
                    <Input
                      id="ward"
                      value={addressForm.ward}
                      onChange={handleInputChange("ward")}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="district">{t("profile.page.form.districtLabel")}</Label>
                    <Input
                      id="district"
                      value={addressForm.district}
                      onChange={handleInputChange("district")}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="city">{t("profile.page.form.cityLabel")}</Label>
                    <Input
                      id="city"
                      value={addressForm.city}
                      onChange={handleInputChange("city")}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-start gap-3 rounded-lg border bg-background p-3">
                    <Checkbox
                      id="isDefaultAddress"
                      checked={addressForm.isDefault}
                      onCheckedChange={(checked) => {
                        setAddressForm((prev) => ({ ...prev, isDefault: checked === true }));
                      }}
                    />
                    <Label
                      htmlFor="isDefaultAddress"
                      className="cursor-pointer text-sm leading-snug text-foreground"
                    >
                      {t("profile.page.form.setAsDefaultLabel")}
                    </Label>
                  </div>

                  {formError ? (
                    <p className="sm:col-span-2 text-sm text-destructive">{formError}</p>
                  ) : null}

                  <div className="sm:col-span-2 flex flex-wrap gap-2">
                    <Button type="submit">{t("profile.page.form.submit")}</Button>
                    <Button type="button" variant="ghost" onClick={handleCancelAddAddress}>
                      {t("profile.page.form.cancel")}
                    </Button>
                  </div>
                </div>
              </form>
            ) : null}

            {addresses.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
                <p className="text-sm font-medium">{t("profile.page.emptyAddressesTitle")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("profile.page.emptyAddressesDescription")}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {addresses.map((address) => (
                  <article
                    key={address.id}
                    className={cn(
                      "rounded-xl border p-4 transition-colors",
                      address.isDefault ? "border-primary/40 bg-primary/5" : "bg-background",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{t(`profile.page.addressTypes.${address.addressType}`)}</Badge>
                      {address.isDefault ? <Badge>{t("profile.page.defaultBadge")}</Badge> : null}
                    </div>

                    <p className="mt-4 text-sm font-semibold">{address.recipientName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{address.phoneNumber}</p>

                    <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{formatAddress(address)}</span>
                    </p>

                    {!address.isDefault ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        {t("profile.page.setAsDefault")}
                      </Button>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;
