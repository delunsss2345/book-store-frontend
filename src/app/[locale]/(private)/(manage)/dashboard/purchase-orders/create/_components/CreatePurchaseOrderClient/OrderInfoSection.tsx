import type { SupplierListData } from "@/types/response/supplier.response";
import type { PurchaseOrderSchemaType } from "@/validation/supplier/supplier.validation";
import type { UseFormReturn } from "react-hook-form";

type OrderInfoSectionProps = {
  form: UseFormReturn<PurchaseOrderSchemaType>;
  suppliers?: SupplierListData;
};

export function OrderInfoSection({ form, suppliers }: OrderInfoSectionProps) {
  return (
    <div className="card p-5">
      <h4 className="display text-[17px] font-semibold text-ink">
        Thông tin chung
      </h4>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="flabel">
            Nhà cung cấp <span className="text-accent">*</span>
          </label>
          <select
            className="field"
            {...form.register("supplierId", { valueAsNumber: true })}
          >
            <option value="">Chọn nhà cung cấp…</option>
            {suppliers?.items?.map((supplier) => (
              <option key={supplier.id} value={Number(supplier.id)}>
                {supplier.name}
              </option>
            ))}
          </select>
          {form.formState.errors.supplierId && (
            <p className="mt-1 text-xs text-accent">
              {form.formState.errors.supplierId.message}
            </p>
          )}
        </div>
        <div>
          <label className="flabel">Mã đơn nhập</label>
          <input
            className="field font-mono bg-paper"
            readOnly
            {...form.register("code")}
          />
        </div>
        <div>
          <label className="flabel">Ghi chú</label>
          <input
            className="field"
            placeholder="Nhập ghi chú cho đơn nhập hàng…"
            {...form.register("note")}
          />
        </div>
      </div>
    </div>
  );
}
