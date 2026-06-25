"use client";

import { useAdminBooksQuery } from "@/features/admin/hooks/use-admin-books-query";
import { useCreatePurchaseOrderMutation } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { usePurchaseStore } from "@/features/purchaser-orders/store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { useDebounceInput } from "@/hooks/use-debounce-input";
import {
  purchaseOrderSchema,
  PurchaseOrderSchemaType,
} from "@/validation/supplier/supplier.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { generateOrderCode, todayISO } from "../utils";
import { CreatePurchaseOrderTopbar } from "./CreatePurchaseOrderTopbar";
import {
  BookFormat,
  calculateImportUnitPrice,
  normalizeBookFormat,
  PurchaseOrderBookOption,
  PurchaseOrderVariantOption,
} from "./helpers";
import { OrderInfoSection } from "./OrderInfoSection";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { PurchaseItemsSection } from "./PurchaseItemsSection";

type PurchaseItemField = "quantity" | "originalPrice" | "discount" | "format";

export function CreatePurchaseOrderClient() {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [debouncedSearch] = useDebounceInput(searchPhrase, 300);
  const [page, setPage] = useState(1);
  const [taxPercent, setTaxPercent] = useState(0);
  const [errors, setErrors] = useState<{ supplier?: string; items?: string }>(
    {},
  );
  const [isSaving, setIsSaving] = useState(false);

  const { data: booksData, isPending: bookPending } = useAdminBooksQuery(
    {
      page,
      limit: 10,
      searchPhrase: debouncedSearch || undefined,
    },
    (response) => response.data,
  );
  const { data: suppliers } = useSupplierQuery();
  const { mutateAsync: createPurchaseOrder } = useCreatePurchaseOrderMutation();
  const { purchaseItems, addItem, deleteItem, updateQuantityItem, updateItem } =
    usePurchaseStore();

  const form = useForm<PurchaseOrderSchemaType>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: 0,
      code: generateOrderCode()!,
      createdAt: todayISO()!,
      note: "",
      discountPrice: 0,
      bookId: 0,
    },
  });

  const addedIds = useMemo(
    () => new Set(purchaseItems.map((item) => item.id)),
    [purchaseItems],
  );

  const subtotal = useMemo(
    () =>
      purchaseItems.reduce(
        (sum, item) =>
          sum +
          item.quantity *
          calculateImportUnitPrice(
            item.originalPrice ?? item.unitPrice ?? 0,
            item.discount ?? 0,
          ),
        0,
      ),
    [purchaseItems],
  );
  const taxAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + taxAmount;
  const totalQty = purchaseItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    form.setValue("discountPrice", subtotal);
    form.setValue(
      "bookId",
      Number(purchaseItems[0]?.bookId ?? purchaseItems[0]?.bookVariantId ?? 0),
    );
  }, [subtotal, purchaseItems, form]);

  const handleAddItem = (
    variant: PurchaseOrderVariantOption,
    book: PurchaseOrderBookOption,
  ) => {
    const variantId = String(variant.id);

    if (purchaseItems.some((item) => item.id === variantId)) {
      updateQuantityItem(variantId);
      return;
    }

    const title = book.translations?.[0]?.title || book.title || "—";
    const originalPrice = Number(variant.price) || 0;
    const discount = 0;
    const unitPrice = calculateImportUnitPrice(originalPrice, discount);

    addItem({
      id: variantId,
      bookId: String(book.id),
      bookVariantName: title,
      bookVariantId: variantId,
      format: normalizeBookFormat(variant.format),
      quantity: 1,
      originalPrice,
      discount,
      unitPrice,
      totalPrice: unitPrice,
    });
  };

  const handleItemChange = useCallback(
    (id: string, field: PurchaseItemField, value: number | BookFormat) => {
      const item = purchaseItems.find((purchaseItem) => purchaseItem.id === id);
      if (!item) return;

      if (field === "quantity" || field === "format") {
        updateItem(id, field, value);
        return;
      }

      const originalPrice =
        field === "originalPrice"
          ? Number(value) || 0
          : (item.originalPrice ?? item.unitPrice ?? 0);
      const discount =
        field === "discount" ? Number(value) || 0 : (item.discount ?? 0);
      const unitPrice = calculateImportUnitPrice(originalPrice, discount);

      updateItem(id, field, Number(value) || 0);
      updateItem(id, "unitPrice", unitPrice);
    },
    [purchaseItems, updateItem],
  );

  const onSubmit = async (values: PurchaseOrderSchemaType) => {
    if (purchaseItems.items.length === 0) {
      setErrors({ items: "Vui lòng thêm ít nhất một sản phẩm" });
      return;
    }

    try {
      setIsSaving(true);
      setErrors({});
      // await createPurchaseOrder({
      //   supplierId: Number(values.supplierId),
      //   bookId: Number(values.bookId),
      //   code: values.code,
      //   createdAt: values.createdAt,
      //   note: values.note,
      //   discountPrice: subtotal,
      //   taxAmount,
      //   items: purchaseItems.map((item) => {
      //     const unitPrice = calculateImportUnitPrice(
      //       item.originalPrice ?? item.unitPrice ?? 0,
      //       item.discount ?? 0,
      //     );

      //     return {
      //       bookVariantId: Number(item.bookVariantId),
      //       quantity: item.quantity,
      //       unitPrice,
      //       totalPrice: item.quantity * unitPrice,
      //     };
      //   }),
      // });
    } catch (error) {
      console.error("[onSubmit] API error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onInvalid = (formErrors: FieldErrors<PurchaseOrderSchemaType>) => {
    if (formErrors.bookId) {
      setErrors({ items: "Vui lòng thêm ít nhất một sản phẩm" });
    }
    console.error("[form invalid] errors:", formErrors);
  };

  const submit = form.handleSubmit(onSubmit, onInvalid);

  return (
    <div className="min-w-0">
      <CreatePurchaseOrderTopbar
        disabled={isSaving}
        onBack={() => router.back()}
        onSubmit={submit}
      />

      <div className="page">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <OrderInfoSection form={form} suppliers={suppliers} />
            <PurchaseItemsSection
              booksData={booksData}
              bookPending={bookPending}
              addedIds={addedIds}
              search={searchPhrase}
              onSearchChange={(value) => {
                setSearchPhrase(value);
                setPage(1);
              }}
              page={page}
              onPageChange={setPage}
              onAddItem={handleAddItem}
              errors={errors.items}
              purchaseItems={purchaseItems}
              onItemChange={handleItemChange}
              onRemoveItem={deleteItem}
            />
          </div>

          <div className="space-y-4">
            <OrderSummaryCard
              itemCount={purchaseItems.length}
              totalQty={totalQty}
              taxPercent={taxPercent}
              onTaxPercentChange={setTaxPercent}
              subtotal={subtotal}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
              onSubmit={submit}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
