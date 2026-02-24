"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
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
import { useEffect, useMemo, useState } from "react";

export default function CheckoutUser() {
  const { data: addresses, isPending } = useQueryAddress();
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >();

  const defaultAddress = useMemo(
    () => addresses?.find((a) => a.isDefault),
    [addresses],
  );
  useEffect(() => {
    if (defaultAddress?.id) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [defaultAddress]);

  return (
    <div className="space-y-12">
      <CheckoutHeader title="Thanh toán" />

      {/* Shipping Address Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-zinc-800" />
            <h3 className="text-lg font-bold">Địa chỉ nhận hàng</h3>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 font-semibold text-blue-600 hover:text-blue-700"
          >
            <Plus className="mr-1 h-4 w-4" /> Thêm địa chỉ mới
          </Button>
        </div>

        <Select value={selectedAddressId} onValueChange={setSelectedAddressId}>
          <SelectTrigger className="flex w-full h-auto items-center justify-between rounded-2xl border-2 border-zinc-900 bg-white px-5 py-10 text-left shadow-sm transition-all">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-xl border-zinc-200 shadow-xl">
            {isPending ? (
              <div className="flex items-center justify-center">
                Đang tải...
              </div>
            ) : (
              addresses?.map((address) => (
                <SelectItemAddress key={address.id} address={address} />
              ))
            )}
          </SelectContent>
        </Select>
      </section>

      <ShippingMethodCard />
      <PaymentCheckout />

      <CheckoutFooter
        buttonText="Đặt hàng ngay"
        secureText="Bảo mật thanh toán theo tiêu chuẩn quốc tế"
        buttonClassName="h-16 w-full rounded-2xl bg-zinc-900 text-lg font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
      />
    </div>
  );
}
