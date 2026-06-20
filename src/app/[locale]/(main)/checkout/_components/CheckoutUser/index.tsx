"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import { useHooksStore } from "@/features/hooks/store/hooks.store";
import { ModalType, useModalStore } from "@/features/modal";
import { useCreateOrderUserMutation } from "@/features/orders";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import { useRouter } from "@/i18n/navigation";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  CreateUserOrdersAndPaymentInput,
  CreateUserOrdersAndPaymentSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutFooter } from "../CheckoutFooter";
import { CheckoutHeader } from "../CheckoutHeader";
import { PaymentCheckout } from "../PaymentCheckout";
import { ShippingMethodCard } from "../ShippingMethodCard";
import SelectItemAddress from "./_components/SelectItemAddress";

export default function CheckoutUser() {
  const { data: addresses, isPending } = useQueryAddress();
  const t = useTranslations();
  const router = useRouter();
  const { onOpen } = useModalStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const setTimeLeft = useHooksStore((state) => state.setTimeLeft);
  const { mutateAsync: createOrderUser, isPending: isCreatingOrder } =
    useCreateOrderUserMutation();

  const form = useForm<CreateUserOrdersAndPaymentInput>({
    resolver: zodResolver(CreateUserOrdersAndPaymentSchema),
    defaultValues: {
      addressId: 0,
      paymentGateway: PaymentGateway.COD,
    },
    mode: "onSubmit",
  });

  const defaultAddress = useMemo(
    () => addresses?.find((address) => address.isDefault),
    [addresses],
  );

  useEffect(() => {
    if (defaultAddress?.id) {
      form.setValue("addressId", Number(defaultAddress.id));
    }
  }, [defaultAddress, form]);

  const handleSubmit = async (values: CreateUserOrdersAndPaymentInput) => {
    if (!values.addressId) {
      toast.warning(t("checkout.toast.addressRequired"));
      return;
    }
    await toast.promise(createOrderUser(values), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        if (values.paymentGateway === PaymentGateway.COD) {
          router.push("/orders");
          clearCart();
          return t("checkout.toast.success");
        }
        setTimeLeft(60);
        clearCart();
        router.push({
          pathname: "/checkout/payment",
          query: {
            orderCode: data.orderCode,
            totalAmount: data.totalAmount,
            subtotal: data.subtotal,
          },
        });
        return t("checkout.toast.success");
      },
      error: (error) => error.response.data.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
        <CheckoutHeader title={t("checkout.userTitle")} />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-ink" />
              <h3 className="text-[17px] font-bold">
                {t("checkout.shippingTitle")}
              </h3>
            </div>

            <button
              onClick={() => onOpen(ModalType.CREATE_ADDRESS)}
              type="button"
              className="inline-flex h-8 items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent/80"
            >
              <Plus className="h-4 w-4" />
              {t("checkout.addNewAddress")}
            </button>
          </div>

          {addresses && addresses.length > 0 ? (
            <FormField
              control={form.control}
              name="addressId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value != null ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-auto w-full items-center justify-between rounded-2xl border-2 border-ink bg-surface px-5 py-6 text-left transition-all">
                        <SelectValue className="text-ink" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-xl border-zinc-200 shadow-xl">
                      {isPending ? (
                        <div className="space-y-2 p-3">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div
                              key={index}
                              className="space-y-1.5 rounded-md border p-3"
                            >
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-full" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        addresses.map((address) => (
                          <SelectItemAddress
                            key={address.id}
                            address={address}
                          />
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="h-8 font-semibold text-blue-600">Chưa có địa chỉ</p>
            </div>
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
