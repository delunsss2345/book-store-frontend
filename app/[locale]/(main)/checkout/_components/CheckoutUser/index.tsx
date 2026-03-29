"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckoutHeader } from "../CheckoutHeader";
import { ShippingMethodCard } from "../ShippingMethodCard";
import { CheckoutFooter } from "../CheckoutFooter";
import { PaymentCheckout } from "../PaymentCheckout";
import { MapPin, Plus } from "lucide-react";
import { useQueryAddress } from "@/features/user-address/hooks/use-query-address-mutation";
import SelectItemAddress from "./_components/SelectItemAddress";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalType, useModalStore } from "@/features/modal";
import { useCreateOrderUserMutation } from "@/features/orders";
import {
  CreateUserOrdersAndPaymentInput,
  CreateUserOrdersAndPaymentSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { FormMessageI18n } from "@/components/common/FormMessageI18n";

export default function CheckoutUser() {
  const { data: addresses, isPending } = useQueryAddress();
  const t = useTranslations();
  const router = useRouter();
  const { onOpen } = useModalStore();
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
      toast.warning("Vui lòng chọn hoặc tạo mới địa chỉ");
      return;
    }
    await toast.promise(createOrderUser(values), {
      loading: t("checkout.toast.loading"),
      success: (data) => {
        if (values.paymentGateway === PaymentGateway.COD) {
          router.push("/orders");
          return t("checkout.toast.success");
        }

        router.push(
          `/checkout/payment?orderCode=${data.orderCode}&totalAmount=${data.totalAmount}&subtotal=${data.subtotal}`,
        );
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
              <MapPin className="h-5 w-5 text-zinc-800" />
              <h3 className="text-lg font-bold">
                {t("checkout.shippingTitle")}
              </h3>
            </div>

            <Button
              onClick={() => onOpen(ModalType.CREATE_ADDRESS)}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 font-semibold text-blue-600 hover:text-blue-700"
            >
              <Plus className="mr-1 h-4 w-4" />
              {t("checkout.addNewAddress")}
            </Button>
          </div>

          {addresses && addresses.length > 0 ? (
            <FormField
              control={form.control}
              name="addressId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-auto w-full items-center justify-between rounded-2xl border-2 border-zinc-900 bg-white px-5 py-10 text-left shadow-sm transition-all">
                        <SelectValue
                          className="black"
                          placeholder={"Chọn địa chỉ"}
                        />
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

        <FormField
          control={form.control}
          name="paymentGateway"
          render={({ field }) => (
            <FormItem>
              <PaymentCheckout />
            </FormItem>
          )}
        />

        <CheckoutFooter
          buttonText={t("checkout.placeOrder")}
          secureText={t("checkout.secureTextHigh")}
          buttonClassName="h-16 w-full rounded-2xl bg-zinc-900 text-lg font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
          disabled={isCreatingOrder}
        />
      </form>
    </Form>
  );
}
