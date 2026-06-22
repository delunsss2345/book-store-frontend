"use client";

import { useQueryMe } from "@/features/auth/hooks/use-query-me";
import { useCreateUserAddressMutation } from "@/features/user-address";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { UserAddressData } from "@/types/response/user-address.response";
import {
  ADDRESS_TYPES,
  CreateUserAddressInput,
  CreateUserAddressSchema,
} from "@/validation/user-address/userAddressValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, MapPin, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ModalView = "list" | "form";

interface ModalSelectAddressProps {
  onClose: () => void;
  selectedAddressId: number;
  onSelect: (addressId: number) => void;
}

export default function ModalSelectAddress({
  onClose,
  selectedAddressId,
  onSelect,
}: ModalSelectAddressProps) {
  const t = useTranslations();
  const { data: addresses, isPending } = useQueryAddress();
  const [view, setView] = React.useState<ModalView>("list");

  const handleSelect = (address: UserAddressData) => {
    onSelect(Number(address.id));
    onClose();
  };

  if (view === "form") {
    return (
      <AddressForm
        onClose={onClose}
        onBack={() => setView("list")}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="display text-[20px] font-semibold text-ink">
        {t("checkout.addressModal.title")}
      </h2>

      <div className="mt-6 max-h-[50vh] space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {isPending ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-line p-5">
                <div className="h-4 w-32 rounded bg-line" />
                <div className="mt-2 h-3 w-full rounded bg-line" />
              </div>
            ))}
          </div>
        ) : addresses && addresses.length > 0 ? (
          addresses.map((address) => {
            const isSelected = Number(address.id) === selectedAddressId;
            return (
              <button
                key={address.id}
                type="button"
                onClick={() => handleSelect(address)}
                className={`relative flex w-full flex-col gap-1.5 rounded-xl border-2 p-5 text-left transition-all ${
                  isSelected
                    ? "border-accent bg-accent/5"
                    : "border-line hover:border-ink/30 hover:bg-paper"
                }`}
              >
                {isSelected && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-ink">
                    {address.recipientName}
                  </span>
                  <span className="text-[13px] text-ink-3">|</span>
                  <span className="text-[13px] text-ink-3">
                    {address.phoneNumber}
                  </span>
                </div>

                <p className="text-[13px] leading-relaxed text-ink-2">
                  {address.addressDetail}, {address.ward}, {address.district},{" "}
                  {address.city}
                </p>

                {address.isDefault && (
                  <span className="mt-1 inline-flex w-fit rounded border border-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {t("checkout.addressModal.default")}
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <MapPin className="h-10 w-10 text-line-2" />
            <p className="mt-3 text-[14px] text-ink-3">
              {t("checkout.addressModal.empty")}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setView("form")}
        className="btn-accent mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-bold"
      >
        <Plus className="h-4 w-4" />
        {t("checkout.addressModal.addNew")}
      </button>
    </div>
  );
}

/* ─── Inline Add-Address Form ─── */

function AddressForm({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack: () => void;
}) {
  const t = useTranslations();
  const { data } = useQueryMe();
  const currentUser = data?.data;

  const { mutateAsync: createAddress, isPending: isLoadingCreateAddress } =
    useCreateUserAddressMutation();

  const form = useForm<CreateUserAddressInput>({
    resolver: zodResolver(CreateUserAddressSchema),
    mode: "onSubmit",
    defaultValues: {
      addressType: "HOME",
      recipientName: `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`.trim(),
      phoneNumber: currentUser?.phoneNumber ?? "",
      addressDetail: "",
      ward: "",
      district: "",
      city: "",
    },
  });

  const handleSubmit = async (values: CreateUserAddressInput) => {
    await toast.promise(createAddress(values), {
      loading: t("profile.page.form.loading"),
      success: () => {
        form.reset();
        onBack();
        return t("profile.page.form.success");
      },
      error: t("profile.page.form.error"),
    });
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("checkout.addressModal.backToList")}
      </button>

      <h2 className="display text-[20px] font-semibold text-ink">
        {t("checkout.addressModal.addNewTitle")}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5 grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="flabel">{t("profile.page.form.addressTypeLabel")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="field flex h-11 w-full items-center justify-between rounded-lg border border-line bg-white px-4 text-[14px]">
                      <SelectValue placeholder={t("profile.page.form.addressTypeLabel")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ADDRESS_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(`profile.page.addressTypes.${type}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("profile.page.form.recipientNameLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("profile.page.form.phoneNumberLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressDetail"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="flabel">{t("profile.page.form.addressDetailLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("profile.page.form.wardLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("profile.page.form.districtLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="flabel">{t("profile.page.form.cityLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="field" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2 pt-1 sm:col-span-2">
            <button
              disabled={isLoadingCreateAddress}
              type="submit"
              className="btn-ink h-11 rounded-lg px-6 text-[14px]"
            >
              {t("profile.page.form.submit")}
            </button>
            <button
              onClick={onBack}
              type="button"
              className="btn-soft h-11 rounded-lg px-6 text-[14px]"
            >
              {t("profile.page.form.cancel")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
