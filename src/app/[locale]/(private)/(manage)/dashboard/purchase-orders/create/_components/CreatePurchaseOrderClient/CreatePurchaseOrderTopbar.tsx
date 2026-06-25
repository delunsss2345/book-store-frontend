import { ArrowLeft, CheckCheck } from "lucide-react";

type CreatePurchaseOrderTopbarProps = {
  disabled: boolean;
  onBack: () => void;
  onSubmit: () => void;
};

export function CreatePurchaseOrderTopbar({
  disabled,
  onBack,
  onSubmit,
}: CreatePurchaseOrderTopbarProps) {
  return (
    <div className="topbar">
      <button className="icon-btn" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div>
        <div className="text-[15px] font-semibold text-ink">
          Tạo Đơn Nhập Hàng Mới
        </div>
        <div className="text-[11px] text-ink-3">
          Điền thông tin và thêm sản phẩm để tạo đơn nhập hàng
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="btn-soft rounded-lg px-3.5 py-2 text-[12.5px]">
          Lưu Nháp
        </button>
        <button
          className="btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
          onClick={onSubmit}
          disabled={disabled}
        >
          <CheckCheck className="h-4 w-4" /> Xác Nhận Nhập Hàng
        </button>
      </div>
    </div>
  );
}
