"use client";

import { useAuthStore } from "@/features/auth";
import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useCreateUserAddressMutation } from "@/features/user-address";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import { Button } from "@/src/components/ui/button";
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
import {
  ADDRESS_TYPES,
  CreateUserAddressInput,
  CreateUserAddressSchema,
} from "@/validation/user-address/userAddressValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ModalCreateAddress(_props: { onClose: () => void }) {
  const t = useTranslations();
  const currentUser = useAuthStore(selectorCurrentUser);

  const { mutateAsync: createAddress, isPending: isLoadingCreateAddress } =
    useCreateUserAddressMutation();

  const form = useForm<CreateUserAddressInput>({
    resolver: zodResolver(CreateUserAddressSchema),
    mode: "onSubmit",
    defaultValues: {
      addressType: "HOME",
      recipientName: `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""
        }`.trim(),
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
        _props.onClose();
        return t("profile.page.form.success");
      },
      error: t("profile.page.form.error"),
    });
  };

  return (
    <div className="flex flex-col mx-auto max-w-lg">
      <div className="flex items-center justify-between">
        <h2 className="display text-[22px] font-semibold text-ink">
          {t("profile.page.form.title")}
        </h2>
      </div>
      <p className="mt-1 text-[13px] text-ink-3">
        Fill in recipient and location details.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5 grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="flabel">{t("profile.page.form.addressTypeLabel")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="field flex h-11 w-full items-center justify-between rounded-lg border border-line bg-white px-4 text-[14px]">
                      <SelectValue
                        placeholder={t("profile.page.form.addressTypeLabel")}
                      />
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
                <FormLabel className="flabel">
                  {t("profile.page.form.recipientNameLabel")}
                </FormLabel>
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
                <FormLabel className="flabel">
                  {t("profile.page.form.addressDetailLabel")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="field" placeholder="Street, house number…" />
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
                  <Input {...field} className="field" placeholder="Ward" />
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
                  <Input {...field} className="field" placeholder="District" />
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
                  <Input {...field} className="field" placeholder="City" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2 pt-1 sm:col-span-2">
            <button disabled={isLoadingCreateAddress} type="submit" className="btn-ink h-11 rounded-lg px-6 text-[14px]">
              {t("profile.page.form.submit")}
            </button>
            <button onClick={_props.onClose} type="button" className="btn-soft h-11 rounded-lg px-6 text-[14px]">
              {t("profile.page.form.cancel")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
