"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import { useHooksStore } from "@/features/hooks/store/hooks.store";
import { useModalStore } from "@/features/modal";
import { useCheckoutUserMutation } from "@/features/orders";
import { useOrderStore } from "@/features/orders/store/order.store";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import { useRouter } from "@/i18n/navigation";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import { Form, FormField, FormItem } from "@/src/components/ui/form";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  UserCheckoutInput,
  UserCheckoutSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutFooter } from "../CheckoutFooter";
import { CheckoutHeader } from "../CheckoutHeader";
import { PaymentCheckout } from "../PaymentCheckout";
import { ShippingMethodCard } from "../ShippingMethodCard";

export default function CheckoutUser() {
  const { data: addresses, isPending } = useQueryAddress();
  const t = useTranslations();
  const router = useRouter();
  const { onOpenSelectAddress } = useModalStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const setTimeLeft = useHooksStore((state) => state.setTimeLeft);
  const setBuyNow = useOrderStore((state) => state.setBuyNow);
  const { mutateAsync: checkout, isPending: isCreatingOrder } =
    useCheckoutUserMutation();

  const form = useForm<UserCheckoutInput>({
    resolver: zodResolver(UserCheckoutSchema),
    defaultValues: {
      addressId: 0,
      paymentGateway: PaymentGateway.COD,
    },
    mode: "onSubmit",
  });

  const addressId = form.watch("addressId");

  const defaultAddress = useMemo(
    () => addresses?.find((address) => address.isDefault),
    [addresses],
  );

  const selectedAddress = useMemo(
    () => addresses?.find((a) => Number(a.id) === addressId),
    [addresses, addressId],
  );

  useEffect(() => {
    if (defaultAddress?.id) {
      form.setValue("addressId", Number(defaultAddress.id));
    }
  }, [defaultAddress, form]);

  const handleSubmit = async (values: UserCheckoutInput) => {
    if (!values.addressId) {
      toast.warning(t("checkout.toast.addressRequired"));
      return;
    }
    await toast.promise(checkout(values), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        clearCart();
        setBuyNow(null);
        if (values.paymentGateway === PaymentGateway.COD) {
          router.push("/orders");
          return t("checkout.toast.success");
        }
        // Online gateway
        const onlineData = data as { tokenUrl?: string; orderCode?: string; totalAmount?: number; subtotal?: number };
        setTimeLeft(60);
        if (onlineData.tokenUrl) {
          router.push({
            pathname: "/checkout/payment",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: { tokenUrl: onlineData.tokenUrl } as any,
          });
        } else {
          router.push({
            pathname: "/checkout/payment",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: {
              orderCode: onlineData.orderCode,
              totalAmount: onlineData.totalAmount,
              subtotal: onlineData.subtotal,
            } as any,
          });
        }
        return t("checkout.toast.success");
      },
      error: (error: Error) => error.message,
    });
  };

  const handleOpenAddressModal = () => {
    onOpenSelectAddress(addressId, (newAddressId: number) => {
      form.setValue("addressId", newAddressId);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
        <CheckoutHeader title={t("checkout.userTitle")} />

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-ink" />
            <h3 className="text-[17px] font-bold">
              {t("checkout.shippingTitle")}
            </h3>
          </div>

          {isPending ? (
            <div className="space-y-2 rounded-2xl border-2 border-line bg-surface p-5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="addressId"
              render={() => (
                <FormItem>
                  <button
                    type="button"
                    onClick={handleOpenAddressModal}
                    className="flex w-full items-center justify-between rounded-2xl border-2 border-ink bg-surface px-5 py-5 text-left transition-all hover:bg-paper"
                  >
                    {selectedAddress ? (
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-bold text-ink">
                            {selectedAddress.recipientName}
                          </span>
                          <span className="text-[13px] text-ink-3">|</span>
                          <span className="text-[13px] text-ink-3">
                            {selectedAddress.phoneNumber}
                          </span>
                          {selectedAddress.isDefault && (
                            <span className="rounded border border-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                              {t("checkout.addressModal.default")}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] leading-relaxed text-ink-2 truncate">
                          {selectedAddress.addressDetail}, {selectedAddress.ward},{" "}
                          {selectedAddress.district}, {selectedAddress.city}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[14px] text-ink-3">
                        {t("checkout.addressModal.selectPrompt")}
                      </span>
                    )}
                    <ChevronRight className="h-5 w-5 shrink-0 text-ink-3" />
                  </button>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
          )}
        </section>

        <ShippingMethodCard />

        <section className="space-y-4">
          <h3 className="text-[17px] font-bold">
            {t("checkout.paymentTitle")}
          </h3>
          <FormField
            control={form.control}
            name="paymentGateway"
            render={() => (
              <FormItem>
                <PaymentCheckout />
              </FormItem>
            )}
          />
        </section>

        <CheckoutFooter
          buttonText="Place order now"
          secureText="Payment security follows international standards"
          buttonClassName="btn-ink h-16 w-full rounded-2xl text-[17px] shadow-xl shadow-line-2/50"
          disabled={isCreatingOrder}
        />
      </form>
    </Form>
  );
}
