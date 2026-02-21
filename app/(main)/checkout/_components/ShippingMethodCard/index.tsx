import { Truck } from "lucide-react";

export function ShippingMethodCard() {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5 text-zinc-800" />
        <h3 className="text-lg font-bold">Phương thức vận chuyển</h3>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Giao hàng tận nơi
            </p>
            <p className="text-xs text-zinc-500">
              Dự kiến nhận hàng sau 2-3 ngày
            </p>
          </div>
        </div>

        <span className="text-sm font-bold uppercase text-green-600">
          Miễn phí
        </span>
      </div>
    </section>
  );
}
