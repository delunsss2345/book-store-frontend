"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Info, Truck } from "lucide-react";

import { CheckoutFooter } from "../CheckoutFooter";
import { CheckoutHeader } from "../CheckoutHeader";
import { PaymentCheckout } from "../PaymentCheckout";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  selectorIsOrdering,
  useCreateOrderGuestMutation,
  useOrderStore,
} from "@/features/orders";
import {
  CreateGuestOrdersAndPaymentInput,
  CreateGuestOrdersAndPaymentSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CheckoutGuest() {
  const paymentGateway = useOrderStore((state) => state.paymentGateway);
  const form = useForm<CreateGuestOrdersAndPaymentInput>({
    resolver: zodResolver(CreateGuestOrdersAndPaymentSchema),
    defaultValues: {
      paymentGateway,
      newsletter: true,
      guestEmail: "",
      note: "",
      orderAddress: {
        country: "vi",
        firstName: "",
        lastName: "",
        addressLine: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
      },
    },
    mode: "onSubmit",
  });

  const { mutateAsync: createOrderGuest } = useCreateOrderGuestMutation();
  const isOrdering = useOrderStore(selectorIsOrdering);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const onSubmit = async (values: CreateGuestOrdersAndPaymentInput) => {
    toast.promise(createOrderGuest(values), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        if (paymentGateway === PaymentGateway.COD) {
          router.push(
            `/${locale}/orders`,
          );
          return t("checkout.toast.success");
        }
        router.push(
          `/${locale}/checkout/payment?orderCode=${data.orderCode}&totalAmount=${data.totalAmount}&subtotal=${data.subtotal}`,
        );
        return t("checkout.toast.success");
      },
      error: (error) => error.message,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="space-y-12"
      >
        <CheckoutHeader
          title={t("checkout.title")}
          right={
            <p className="text-sm text-zinc-500">
              {t("checkout.hasAccount")}{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                {t("checkout.signIn")}
              </a>
            </p>
          }
        />

        {/* Contact Section */}
        <section className="space-y-4">
          <FormField
            control={form.control}
            name="guestEmail"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel className="text-sm font-medium">
                  {t("checkout.contactEmail")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your-email@example.com"
                    className="h-12 border-zinc-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 px-1">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(v) => field.onChange(!!v)}
                  />
                </FormControl>
                <Label className="text-sm leading-none text-zinc-600">
                  {t("checkout.newsletter")}
                </Label>
              </FormItem>
            )}
          />
        </section>

        {/* Shipping Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <Truck className="h-5 w-5 text-zinc-800" />
            <h2 className="text-lg font-semibold">{t("checkout.shippingTitle")}</h2>
          </div>

          <div className="grid gap-4">
            {/* Country */}
            <FormField
              control={form.control}
              name="orderAddress.country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v)}
                      defaultValue="vn"
                    >
                      <SelectTrigger className="h-12 border-zinc-200 shadow-sm">
                        <SelectValue placeholder={t("checkout.countryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem defaultChecked value="vn">
                          {t("checkout.countries.vn")}
                        </SelectItem>
                        <SelectItem value="us">{t("checkout.countries.us")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="orderAddress.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.firstNamePlaceholder")}
                        className="h-12 border-zinc-200 shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderAddress.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.lastNamePlaceholder")}
                        className="h-12 border-zinc-200 shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="orderAddress.addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("checkout.addressPlaceholder")}
                      className="h-12 border-zinc-200 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="orderAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.cityPlaceholder")}
                        className="h-12 border-zinc-200 shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderAddress.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.postalCodePlaceholder")}
                        className="h-12 border-zinc-200 shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="orderAddress.phoneNumber"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder={t("checkout.phonePlaceholder")}
                      className="h-12 border-zinc-200 pr-10 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <Info className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Payment Section */}
        <PaymentCheckout />

        {/* Footer submit */}
        <CheckoutFooter buttonText={t("checkout.submitButton")} disabled={isOrdering} />
      </form>
    </Form>
  );
}
