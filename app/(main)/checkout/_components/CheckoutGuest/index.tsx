"use client";

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
import { PaymentMethodRadio } from "../PaymentMethodRadio";
import { CheckoutFooter } from "../CheckoutFooter";
import { PaymentCheckout } from "../PaymentCheckout";

export function CheckoutGuest() {
  return (
    <div className="space-y-12">
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
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email liên hệ
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your-email@example.com"
            className="h-12 border-zinc-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900"
          />
        </div>

        <div className="flex items-center gap-2 px-1">
          <Checkbox id="newsletter" defaultChecked />
          <Label
            htmlFor="newsletter"
            className="text-sm leading-none text-zinc-600"
          >
            Nhận thông tin cập nhật về đơn hàng và ưu đãi mới nhất
          </Label>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b pb-2">
          <Truck className="h-5 w-5 text-zinc-800" />
          <h2 className="text-lg font-semibold">Địa chỉ giao hàng</h2>
        </div>

        <div className="grid gap-4">
          <Select defaultValue="vn">
            <SelectTrigger className="h-12 border-zinc-200 shadow-sm">
              <SelectValue placeholder="Quốc gia/ Vùng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vn">Việt Nam</SelectItem>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Họ và tên đệm"
              className="h-12 border-zinc-200 shadow-sm"
            />
            <Input
              placeholder="Tên"
              className="h-12 border-zinc-200 shadow-sm"
            />
          </div>

          <Input
            placeholder="Địa chỉ chi tiết (Số nhà, tên đường...)"
            className="h-12 border-zinc-200 shadow-sm"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Tỉnh / Thành phố"
              className="h-12 border-zinc-200 shadow-sm"
            />
            <Input
              placeholder="Mã bưu chính (Tùy chọn)"
              className="h-12 border-zinc-200 shadow-sm"
            />
          </div>

          <div className="relative">
            <Input
              placeholder="Số điện thoại"
              className="h-12 border-zinc-200 pr-10 shadow-sm"
            />
            <Info className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <PaymentCheckout />
      <CheckoutFooter buttonText="Hoàn tất đặt hàng" />
    </div>
  );
}
