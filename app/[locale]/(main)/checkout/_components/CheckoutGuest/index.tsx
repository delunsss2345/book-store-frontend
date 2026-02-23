"use client";

import { z } from "zod";
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
import { CreditCard, Info, Truck } from "lucide-react";

import { CheckoutHeader } from "../CheckoutHeader";
import { CheckoutFooter } from "../CheckoutFooter";
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
  CreateGuestOrdersAndPaymentInput,
  CreateGuestOrdersAndPaymentSchema,
  PaymentGateway,
} from "@/validation/order-address/orderAddressValidation";
import {
  selectorIsOrdering,
  useCreateOrderGuestMutation,
  useOrderStore,
} from "@/features/orders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function CheckoutGuest() {
  const form = useForm<CreateGuestOrdersAndPaymentInput>({
    resolver: zodResolver(CreateGuestOrdersAndPaymentSchema),
    defaultValues: {
      paymentGateway: PaymentGateway.SEPAY,
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

  const onSubmit = async (values: CreateGuestOrdersAndPaymentInput) => {
    toast.promise(createOrderGuest(values), {
      loading: "Đang xử lý đơn hàng...",
      success: (data) => {
        router.push(
          `/${locale}/checkout/payment?orderCode=${data.orderCode}&totalAmount=${data.totalAmount}&subtotal=${data.subtotal}`,
        );
        return "Đơn hàng đã được tạo thành công!";
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
          title="Thông tin thanh toán"
          right={
            <p className="text-sm text-zinc-500">
              Đã có tài khoản?{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Đăng nhập
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
                  Email liên hệ
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
                  Nhận thông tin cập nhật về đơn hàng và ưu đãi mới nhất
                </Label>
              </FormItem>
            )}
          />
        </section>

        {/* Shipping Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <Truck className="h-5 w-5 text-zinc-800" />
            <h2 className="text-lg font-semibold">Địa chỉ giao hàng</h2>
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
                        <SelectValue placeholder="Quốc gia/ Vùng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem defaultChecked value="vn">
                          Việt Nam
                        </SelectItem>
                        <SelectItem value="us">United States</SelectItem>
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
                        placeholder="Họ và tên đệm"
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
                        placeholder="Tên"
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
                      placeholder="Địa chỉ chi tiết (Số nhà, tên đường...)"
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
                        placeholder="Tỉnh / Thành phố"
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
                        placeholder="Mã bưu chính (Tùy chọn)"
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
                      placeholder="Số điện thoại"
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
        <CheckoutFooter buttonText="Hoàn tất đặt hàng" disabled={isOrdering} />
      </form>
    </Form>
  );
}
