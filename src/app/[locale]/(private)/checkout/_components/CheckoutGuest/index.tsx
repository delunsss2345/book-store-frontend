"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
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
  useCheckoutGuestMutation,
  useOrderStore,
} from "@/features/orders";
import {
  GuestCheckoutInput,
  GuestCheckoutSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CheckoutGuest() {
  const paymentGateway = useOrderStore((state) => state.paymentGateway);
  const clearCart = useCartStore((state) => state.clearCart);
  const setTimeLeft = useHooksStore((state) => state.setTimeLeft);

  const form = useForm<GuestCheckoutInput>({
    resolver: zodResolver(GuestCheckoutSchema),
    defaultValues: {
      paymentGateway,
      guestEmail: "",
      guestAddress: {
        name: "",
        addressLine: "",
        city: "",
        ward: "",
        district: "",
        phoneNumber: "",
        note: "",
      },
    },
    mode: "onSubmit",
  });

  const { mutateAsync: checkout } = useCheckoutGuestMutation();
  const isOrdering = useOrderStore(selectorIsOrdering);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const onSubmit = async (values: GuestCheckoutInput) => {
    const payload: GuestCheckoutInput = {
      ...values,
      paymentGateway,
    };
    toast.promise(checkout(payload), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        console.log(paymentGateway);
        if (payload.paymentGateway === PaymentGateway.COD) {
          router.push(`/${locale}/orders`);
          clearCart();
          return t("checkout.toast.success");
        }
        const onlineData = data as { tokenUrl?: string };
        setTimeLeft(60);
        clearCart();
        if (onlineData.tokenUrl) {
          router.push(`/${locale}/checkout/payment/${onlineData.tokenUrl}`);
        } else {
          router.push(`/${locale}/orders`);
        }
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
            {/* Full name */}
            <FormField
              control={form.control}
              name="guestAddress.name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("checkout.namePlaceholder")}
                      className="field"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address line */}
            <FormField
              control={form.control}
              name="guestAddress.addressLine"
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
              {/* Ward */}
              <FormField
                control={form.control}
                name="guestAddress.ward"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.wardPlaceholder")}
                        className="field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District */}
              <FormField
                control={form.control}
                name="guestAddress.district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("checkout.districtPlaceholder")}
                        className="field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City */}
            <FormField
              control={form.control}
              name="guestAddress.city"
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="guestAddress.phoneNumber"
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

            {/* Note */}
            <FormField
              control={form.control}
              name="guestAddress.note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("checkout.notePlaceholder")}
                      className="field"
                      {...field}
                    />
                  </FormControl>
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
