"use client";

import { useAdminBookVariantsQuery } from "@/features/admin/hooks/use-admin-book-variant-query";
import { useCreatePurchaseOrderMutation } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import {
  PurchaseItem,
  usePurchaseStore,
} from "@/features/purchaser-orders/store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form } from "@/src/components/ui/form";
import { AdminBookVariantDetail } from "@/types/response/admin-book-variant.response";
import { Book } from "@/types/response/variant.response";
import {
  purchaseOrderSchema,
  PurchaseOrderSchemaType,
} from "@/validation/supplier/supplier.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Loader2,
  PackageOpen,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrderInfoCard } from "../OrderInfoCard";
import { OrderSummaryBar } from "../OrderSummaryBar";
import { ProductSearchBox } from "../ProductSearchBox";
import { PurchaseItemsMobileList } from "../PurchaseItemsMobileList";
import { PurchaseItemsTable } from "../PurchaseItemsTable";
import { QuickCreateDialog } from "../QuickCreateDialog";
import { generateOrderCode, todayISO } from "../utils";

export function CreatePurchaseOrderClient() {
  const router = useRouter();
  const { data: books, isPending: bookVariantPending } =
    useAdminBookVariantsQuery();
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
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [quickCreateName, setQuickCreateName] = useState("");
  const [errors] = useState<{ supplier?: string; items?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAddItem = (variant: AdminBookVariantDetail, book: Book) => {
    if (purchaseItems.some((i) => i.id === variant.id)) {
      updateQuantityItem(variant.id);
      return;
    }

    addItem({
      id: variant.id,
      bookVariantName: book.translations[0]?.title ?? "",
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

  const handleQuickCreate = (_newItem: PurchaseItem) => {
    setQuickCreateOpen(false);
  };

  const handleOpenQuickCreate = useCallback((searchQuery: string) => {
    setQuickCreateName(searchQuery);
    setQuickCreateOpen(true);
  }, []);

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
    try {
      setIsSaving(true);

      const items = purchaseItems.map((i) => ({
        bookVariantId: Number(i.bookVariantId),
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.quantity * i.unitPrice,
      }));

      const payload = {
        supplierId: values.supplierId,
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

  const onInvalid = (errors: unknown) => {
    console.error("[form invalid] errors:", errors);
  };

  return (
    <div className="max-w-400 mx-auto p-4 lg:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Tạo Đơn Nhập Hàng Mới
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Điền thông tin và thêm sản phẩm để tạo đơn nhập hàng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 cursor-pointer">
            <Save className="size-4" />
            <span className="hidden sm:inline">Lưu Nháp</span>
          </Button>

          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer min-w-35"
            onClick={form.handleSubmit(onSubmit, onInvalid)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}
            Xác Nhận Nhập Hàng
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          onError={(error) => console.log(error)}
          className="space-y-6"
        >
          <OrderInfoCard
            form={form}
            suppliers={suppliers?.items}
            supplierPending={supplierPending}
          />

          <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-visible">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <BookOpen className="size-4 text-emerald-500" />
                  <CardTitle className="text-sm font-semibold">
                    Sản phẩm trong đơn
                  </CardTitle>
                  {purchaseItems.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-5 px-1.5 ml-1"
                    >
                      {purchaseItems.length} sản phẩm
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 md:p-6 space-y-4">
              <ProductSearchBox
                books={books}
                bookVariantPending={bookVariantPending}
                onAddItem={handleAddItem}
                onOpenQuickCreate={handleOpenQuickCreate}
              />

              {errors.items && (
                <p className="text-xs text-red-500">{errors.items}</p>
              )}

              {purchaseItems.length > 0 ? (
                <>
                  <PurchaseItemsTable
                    purchaseItems={purchaseItems}
                    onItemChange={handleItemChange}
                    onRemoveItem={handleRemoveItem}
                  />

                  <PurchaseItemsMobileList
                    purchaseItems={purchaseItems}
                    onItemChange={handleItemChange}
                    onRemoveItem={handleRemoveItem}
                  />

                  <OrderSummaryBar
                    itemTypeCount={purchaseItems.length}
                    totalQty={totalQty}
                    taxPercent={taxPercent}
                    setTaxPercent={setTaxPercent}
                    subtotal={subtotal}
                    taxAmount={taxAmount}
                    grandTotal={grandTotal}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <PackageOpen className="size-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Chưa có sản phẩm nào
                  </p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Sử dụng thanh tìm kiếm phía trên để bắt đầu thêm sản phẩm
                    vào đơn nhập hàng
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t shadow-lg z-20">
        <Button
          className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-11 cursor-pointer"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CheckCircle2 className="size-4" />
          )}
          Xác Nhận Nhập Hàng
        </Button>
      </div>

      <QuickCreateDialog
        open={quickCreateOpen}
        onOpenChange={setQuickCreateOpen}
        initialName={quickCreateName}
        onConfirm={handleQuickCreate}
      />

      <div className="md:hidden h-20" />
    </div>
  );
}
