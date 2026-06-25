"use client";

import { useAdminBooksQuery } from "@/features/admin/hooks/use-admin-books-query";
import { useCreatePurchaseOrderMutation } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import {
  usePurchaseStore,
} from "@/features/purchaser-orders/store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { AdminBookVariantDetail } from "@/types/response/admin-book-variant.response";
import { Book } from "@/types/response/variant.response";
import {
  purchaseOrderSchema,
  PurchaseOrderSchemaType,
} from "@/validation/supplier/supplier.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceInput } from "@/hooks/use-debounce-input";
import { generateOrderCode, todayISO } from "../utils";
import { ProductPickerTable } from "../ProductPickerTable";

export function CreatePurchaseOrderClient() {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [debouncedSearch] = useDebounceInput(searchPhrase, 300);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: booksData, isPending: bookPending } =
    useAdminBooksQuery(
      {
        page,
        limit,
        searchPhrase: debouncedSearch || undefined,
      },
      (response) => response.data
    );
  const { data: suppliers, isPending: supplierPending } = useSupplierQuery();

  const form = useForm<PurchaseOrderSchemaType>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: 0,
      code: generateOrderCode()!,
      createdAt: todayISO()!,
      note: "",
      totalAmount: 0,
    },
  });

  const { purchaseItems, addItem, deleteItem, updateQuantityItem, updateItem } =
    usePurchaseStore();

  const { mutateAsync: createPurchaseOrder } = useCreatePurchaseOrderMutation();

  const [taxPercent, setTaxPercent] = useState(0);
  const [errors, setErrors] = useState<{ supplier?: string; items?: string }>(
    {},
  );
  const [isSaving, setIsSaving] = useState(false);

  const addedIds = useMemo(
    () => new Set(purchaseItems.map((i) => i.id)),
    [purchaseItems],
  );

  const handleAddItem = (variant: any, book: any) => {
    if (purchaseItems.some((i) => i.id === variant.id)) {
      updateQuantityItem(variant.id);
      return;
    }

    const title = book.translations?.[0]?.title || book.title || "—";

    addItem({
      id: variant.id,
      bookVariantName: title,
      bookVariantId: variant.id,
      format: variant.format,
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    });
  };

  const handleRemoveItem = (id: string) => {
    deleteItem(id);
  };

  const handleItemChange = useCallback(
    (id: string, field: "quantity" | "unitPrice", value: number) => {
      updateItem(id, field, value);
    },
    [updateItem],
  );



  const subtotal = purchaseItems.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0,
  );
  useEffect(() => {
    form.setValue("totalAmount", subtotal);
  }, [subtotal, form]);
  const taxAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + taxAmount;
  const totalQty = purchaseItems.reduce((sum, i) => sum + i.quantity, 0);

  const onSubmit = async (values: PurchaseOrderSchemaType) => {
    if (purchaseItems.length === 0) {
      setErrors({ items: "Vui lòng thêm ít nhất một sản phẩm" });
      return;
    }

    try {
      setIsSaving(true);
      setErrors({});

      const items = purchaseItems.map((i) => ({
        bookVariantId: Number(i.bookVariantId),
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.quantity * i.unitPrice,
      }));

      const payload = {
        supplierId: Number(values.supplierId),
        code: values.code,
        createdAt: values.createdAt,
        note: values.note,
        totalAmount: subtotal,
        taxAmount,
        items,
      };

      await createPurchaseOrder(payload);
    } catch (error) {
      console.error("[onSubmit] API error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onInvalid = (formErrors: any) => {
    console.error("[form invalid] errors:", formErrors);
  };

  return (
    <div className="min-w-0">
      <div className="topbar">
        <button className="icon-btn" onClick={() => router.back()}>
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
            onClick={form.handleSubmit(onSubmit, onInvalid)}
            disabled={isSaving}
          >
            <CheckCheck className="h-4 w-4" /> Xác Nhận Nhập Hàng
          </button>
        </div>
      </div>

      <div className="page">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {/* Thông tin chung */}
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">
                Thông tin chung
              </h4>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flabel">
                    Nhà cung cấp <span className="text-accent">*</span>
                  </label>
                  <select className="field" {...form.register("supplierId")}>
                    <option value="">Chọn nhà cung cấp…</option>
                    {suppliers?.items?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
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
                  <label className="flabel">Ngày nhập</label>
                  <input
                    className="field"
                    type="date"
                    {...form.register("createdAt")}
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

            {/* Sản phẩm trong đơn */}
            <div className="card ">
              <div className="flex items-center justify-between px-5 py-4">
                <h4 className="display text-[17px] font-semibold text-ink">
                  Chọn sản phẩm
                </h4>
                {purchaseItems.length > 0 && (
                  <span className="bdg bdg-blue">
                    {purchaseItems.length} đã chọn
                  </span>
                )}
              </div>
              <div className="px-5 pb-4">
                <ProductPickerTable
                  booksData={booksData}
                  bookPending={bookPending}
                  addedIds={addedIds}
                  search={searchPhrase}
                  onSearchChange={(v) => {
                    setSearchPhrase(v);
                    setPage(1);
                  }}
                  page={page}
                  onPageChange={setPage}
                  onAddItem={handleAddItem}
                />
                {errors.items && (
                  <p className="mt-2 text-xs text-accent">{errors.items}</p>
                )}
              </div>

              {purchaseItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="tbl w-full">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Định dạng</th>
                        <th>Số lượng</th>
                        <th>Đơn giá nhập (₫)</th>
                        <th className="text-right">Thành tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseItems.map((item) => (
                        <tr key={item.id}>
                          <td
                            className="font-semibold text-ink max-w-[200px] truncate"
                            title={item.bookVariantName}
                          >
                            {item.bookVariantName}
                          </td>
                          <td>
                            <span className="bdg bdg-gray">{item.format}</span>
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              className="field h-8 w-20 px-2"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              className="field h-8 w-28 px-2"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "unitPrice",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="text-right font-semibold text-ink">
                            {(item.quantity * item.unitPrice).toLocaleString()}{" "}
                            ₫
                          </td>
                          <td className="text-right">
                            <button
                              className="icon-btn h-8 w-8 text-accent hover:border-accent hover:text-accent"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-ink-3">
                  <p className="text-[13px]">Chưa có sản phẩm nào được chọn.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Tổng kết */}
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">
                Tổng kết
              </h4>
              <div className="mt-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-ink-2">Tổng sản phẩm</span>
                  <span className="font-medium text-ink">
                    {purchaseItems.length} loại · {totalQty} items
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-2">Thuế (%)</span>
                  <input
                    type="number"
                    className="field h-8 w-20 text-right px-2"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
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
                  <span className="font-semibold text-ink">
                    Tổng thanh toán
                  </span>
                  <span className="display font-semibold text-accent">
                    {grandTotal.toLocaleString()} ₫
                  </span>
                </div>
              </div>
              <button
                className="btn-ink mt-4 w-full rounded-lg py-2.5 text-[13px]"
                onClick={form.handleSubmit(onSubmit, onInvalid)}
                disabled={isSaving}
              >
                <CheckCheck className="h-4 w-4 mr-2 inline" /> Xác Nhận Nhập
                Hàng
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
