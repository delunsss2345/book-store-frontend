import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function AddressForm() {
  const { t } = useTranslation();
  const currentUser = useAuthStore(selectorCurrentUser);
  const form = useForm<CreateUserAddressInput>({
    resolver: zodResolver(CreateUserAddressSchema),
    defaultValues: {
      addressType: "HOME",
      recipientName: currentUser?.firstName + " " + currentUser?.lastName,
      phoneNumber: currentUser?.phoneNumber,
      addressDetail: "",
      ward: "",
      district: "",
      city: "",
    },
  });
  const { mutateAsync: createAddress, isPending: isLoadingCreateAddress } =
    useCreateUserAddressMutation();
  const onSubmit = async (values: CreateUserAddressInput) => {
    toast.promise(createAddress(values), {
      loading: t("profile.page.form.loading"),
      success: t("profile.page.form.success"),
      error: t("profile.page.form.error"),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl border bg-muted/20 p-5"
      >
        <div className="mb-4">
          <p className="text-sm font-semibold">
            {t("profile.page.form.title")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("profile.page.form.description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
                        aria-modal={false}
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

          {/* Recipient Name */}
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

          {/* Ward */}
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

          {/* District */}
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

          {/* City */}
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

          {/* Is Default - Checkbox
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="sm:col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    {t("profile.page.form.setAsDefaultLabel")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          /> */}

          {/* Buttons */}
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <Button disabled={isLoadingCreateAddress} type="submit">
              {t("profile.page.form.submit")}
            </Button>
            <Button type="button" variant="ghost">
              {t("profile.page.form.cancel")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
