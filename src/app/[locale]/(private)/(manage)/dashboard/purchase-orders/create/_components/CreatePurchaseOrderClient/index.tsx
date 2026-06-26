"use client";

import { useAdminBooksQuery } from "@/features/admin/hooks/use-admin-books-query";
import { ModalType, useModalStore } from "@/features/modal";
import { useCreatePurchaseOrderMutation } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import {
  PurchaseItem,
  usePurchaseStore,
} from "@/features/purchaser-orders/store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { useDebounceInput } from "@/hooks/use-debounce-input";
import {
  purchaseOrderSchema,
  PurchaseOrderSchemaType,
} from "@/validation/supplier/supplier.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { generateOrderCode } from "../utils";
import { CreatePurchaseOrderTopbar } from "./CreatePurchaseOrderTopbar";
import {
  calculateImportUnitPrice,
  normalizeBookFormat,
  PurchaseOrderBookOption,
  PurchaseOrderVariantOption,
} from "./helpers";
import { OrderInfoSection } from "./OrderInfoSection";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { PurchaseItemsSection } from "./PurchaseItemsSection";

export function CreatePurchaseOrderClient() {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params.locale ?? "vi";
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
      limit: 5,
      searchPhrase: debouncedSearch || undefined,
    },
    (response) => response.data,
  );
  const { data: suppliers } = useSupplierQuery();
  const { mutateAsync: createPurchaseOrder } = useCreatePurchaseOrderMutation();
  const { purchaseItems, addItem, deleteItem, updateQuantityItem, clearItems } =
    usePurchaseStore();
  const {
    onOpen,
    setBookDetailId,
    setPurchaseOrderConfirmSubmit,
    setPurchaseOrderVariantSelect,
  } = useModalStore();

  const form = useForm<PurchaseOrderSchemaType>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: 0,
      code: generateOrderCode()!,
      note: "",
    },
  });

  const addedIds = useMemo(
    () => new Set(purchaseItems.map((item) => item.bookId)),
    [purchaseItems],
  );

  const totalQty = purchaseItems.reduce((sum, item) => sum + item.quantity, 0);

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
    const originalPrice = Number(variant.costPrice ?? variant.price) || 0;
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
      discountPrice: discount,
      unitPrice,
      totalPrice: unitPrice,
    });
  };

  const handleOpenBook = (bookId: string) => {
    setBookDetailId(bookId);
    setPurchaseOrderVariantSelect(handleAddItem);
    onOpen(ModalType.BOOK_DETAIL);
  };

  const createOrder = async (
    values: PurchaseOrderSchemaType,
    confirmedItems: PurchaseItem[],
  ) => {
    const confirmedSubtotal = confirmedItems.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          calculateImportUnitPrice(
            item.unitPrice,
            item.discountPrice ?? item.discount ?? 0,
          ),
      0,
    );

    await createPurchaseOrder({
      supplierId: Number(values.supplierId),
      code: values.code,
      note: values.note,
      taxAmount: confirmedSubtotal * (taxPercent / 100),
      items: confirmedItems.map((item) => ({
        bookVariantId: Number(item.bookVariantId),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPrice: item.discountPrice ?? item.discount ?? 0,
      })),
    });

    clearItems();
    router.push(`/${locale}/dashboard/purchase-orders`);
  };

  const onSubmit = async (values: PurchaseOrderSchemaType) => {
    if (purchaseItems.length === 0) {
      setErrors({ items: "Vui lòng thêm ít nhất một sản phẩm" });
      return;
    }

    setErrors({});
    setPurchaseOrderConfirmSubmit(async (confirmedItems) => {
      try {
        setIsSaving(true);
        await createOrder(values, confirmedItems);
      } finally {
        setIsSaving(false);
      }
    });
    onOpen(ModalType.CONFIRM_PURCHASE_ORDER);
  };

  const onInvalid = (formErrors: FieldErrors<PurchaseOrderSchemaType>) => {
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
              onOpenBook={handleOpenBook}
              errors={errors.items}
              purchaseItems={purchaseItems}
              onRemoveItem={deleteItem}
            />
          </div>

          <div className="space-y-4">
            <OrderSummaryCard
              itemCount={purchaseItems.length}
              totalQty={totalQty}
              taxPercent={taxPercent}
              onTaxPercentChange={setTaxPercent}
              onSubmit={submit}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
