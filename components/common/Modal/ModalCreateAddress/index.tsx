"use client";

import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/features/auth";
import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useCreateUserAddressMutation } from "@/features/user-address";
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
      recipientName: `${currentUser?.firstName ?? ""} ${
        currentUser?.lastName ?? ""
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          {t("profile.page.form.title")}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{t("profile.page.form.addressTypeLabel")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1.5 w-full">
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
                <FormLabel>
                  {t("profile.page.form.recipientNameLabel")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
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
                <FormLabel>{t("profile.page.form.phoneNumberLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
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
                <FormLabel>
                  {t("profile.page.form.addressDetailLabel")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
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
                <FormLabel>{t("profile.page.form.wardLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
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
                <FormLabel>{t("profile.page.form.districtLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
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
                <FormLabel>{t("profile.page.form.cityLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1.5" />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2 pt-2">
            <Button disabled={isLoadingCreateAddress} type="submit">
              {t("profile.page.form.submit")}
            </Button>
            <Button onClick={_props.onClose} type="button" variant="ghost">
              {t("profile.page.form.cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
