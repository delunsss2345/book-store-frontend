"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Info, Truck } from "lucide-react";

import { CheckoutFooter } from "../CheckoutFooter";
import { CheckoutHeader } from "../CheckoutHeader";
import { PaymentCheckout } from "../PaymentCheckout";
import { ShippingMethodCard } from "../ShippingMethodCard";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import { useCartStore } from "@/features/cart/store/cart.store";
import { useHooksStore } from "@/features/hooks/store/hooks.store";
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
  const clearCart = useCartStore((state) => state.clearCart);
  const setTimeLeft = useHooksStore((state) => state.setTimeLeft);

  const form = useForm<CreateGuestOrdersAndPaymentInput>({
    resolver: zodResolver(CreateGuestOrdersAndPaymentSchema),
    defaultValues: {
      paymentGateway,
      newsletter: true,
      guestEmail: "",
      note: "",
      orderAddress: {
        country: "vn",
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
    const payload = {
      ...values,
      paymentGateway,
    };
    toast.promise(createOrderGuest(payload), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        if (payload.paymentGateway === PaymentGateway.COD) {
          router.push(`/${locale}/orders`);
          clearCart();
          return t("checkout.toast.success");
        }
        setTimeLeft(60);
        router.push(`/${locale}/checkout/payment/${data.tokenUrl}`);
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
            <p className="text-[14px] text-ink-3">
              {t("checkout.hasAccount")}{" "}
              <a href="#" className="font-semibold text-accent hover:underline">
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
                <FormLabel className="flabel">
                  {t("checkout.contactEmail")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your-email@example.com"
                    className="field"
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
                <Label className="text-[13px] text-ink-2">
                  {t("checkout.newsletter")}
                </Label>
              </FormItem>
            )}
          />
        </section>

        {/* Shipping Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-ink" />
            <h3 className="text-[17px] font-bold">
              {t("checkout.shippingTitle")}
            </h3>
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
                      value={field.value ?? "vn"}
                      onValueChange={(v) => field.onChange(v)}
                      defaultValue="vn"
                      disabled
                    >
                      <SelectTrigger className="field">
                        <SelectValue
                          placeholder={t("checkout.countryPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vn">
                          {t("checkout.countries.vn")}
                        </SelectItem>
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
                        className="field"
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
                        className="field"
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
                      className="field"
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
                        className="field"
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
                        className="field"
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
                      className="field pr-10"
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

        <ShippingMethodCard />

        <section className="space-y-4">
          <h3 className="text-[17px] font-bold">
            {t("checkout.paymentTitle")}
          </h3>
          <PaymentCheckout />
        </section>

        <CheckoutFooter
          buttonText="Place order now"
          secureText="Payment security follows international standards"
          buttonClassName="btn-ink h-16 w-full rounded-2xl text-[17px] shadow-xl shadow-line-2/50"
          disabled={isOrdering}
        />
      </form>
    </Form>
  );
}
