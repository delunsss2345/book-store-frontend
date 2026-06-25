import { CheckCheck } from "lucide-react";

type OrderSummaryCardProps = {
  grandTotal: number;
  isSaving: boolean;
  itemCount: number;
  subtotal: number;
  taxAmount: number;
  taxPercent: number;
  totalQty: number;
  onSubmit: () => void;
  onTaxPercentChange: (value: number) => void;
};

export function OrderSummaryCard({
  grandTotal,
  isSaving,
  itemCount,
  subtotal,
  taxAmount,
  taxPercent,
  totalQty,
  onSubmit,
  onTaxPercentChange,
}: OrderSummaryCardProps) {
  return (
    <div className="card p-5">
      <h4 className="display text-[17px] font-semibold text-ink">Tổng kết</h4>
      <div className="mt-4 space-y-2.5 text-[13px]">
        <div className="flex justify-between">
          <span className="text-ink-2">Tổng sản phẩm</span>
          <span className="font-medium text-ink">
            {itemCount} loại · {totalQty} items
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink-2">Thuế (%)</span>
          <input
            type="number"
            className="field h-8 w-20 text-right px-2"
            value={taxPercent}
            onChange={(event) =>
              onTaxPercentChange(Number(event.target.value) || 0)
            }
          />
        </div>
        <div className="flex justify-between">
          <span className="text-ink-2">Tạm tính</span>
          <span className="font-medium text-ink">
            {subtotal.toLocaleString()} ₫
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-2">Thuế</span>
          <span className="font-medium text-ink">
            {taxAmount.toLocaleString()} ₫
          </span>
        </div>
        <div className="hairline my-2"></div>
        <div className="flex items-center justify-between text-[15px]">
          <span className="font-semibold text-ink">Tổng thanh toán</span>
          <span className="display font-semibold text-accent">
            {grandTotal.toLocaleString()} ₫
          </span>
        </div>
      </div>
      <button
        className="btn-ink mt-4 w-full rounded-lg py-2.5 text-[13px]"
        onClick={onSubmit}
        disabled={isSaving}
      >
        <CheckCheck className="h-4 w-4 mr-2 inline" /> Xác Nhận Nhập Hàng
      </button>
    </div>
  );
}
