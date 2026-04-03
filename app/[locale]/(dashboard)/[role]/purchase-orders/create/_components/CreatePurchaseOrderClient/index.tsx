"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Search,
  Trash2,
  Plus,
  PackageOpen,
  Loader2,
  BookOpen,
  ClipboardList,
  CalendarDays,
  FileText,
  Truck,
} from "lucide-react";

import {
  purchaseOrderSchema,
  PurchaseOrderSchemaType,
} from "@/validation/supplier/supplier.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  PurchaseItem,
  usePurchaseStore,
} from "@/features/purchaser-orders/store";
import { useAdminBookVariantsQuery } from "@/features/admin/hooks/use-admin-book-variant-query";
import { BookVariantPurchaseItem } from "../BookVariantItem";
import { AdminBookVariantDetail } from "@/types/response/admin-book-variant.response";
import { Book } from "@/types/response/variant.response";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { useCreatePurchaseOrderMutation } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { useModalStore } from "@/features/modal";

function generateOrderCode() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `PO-${y}${m}${d}-${seq}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CreatePurchaseOrderClient() {
  const router = useRouter();
  const { data: books, isPending: bookVariantPending } =
    useAdminBookVariantsQuery();
  const { data: suppliers, isPending: supplierPending } = useSupplierQuery();

  const form = useForm<PurchaseOrderSchemaType>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: "",
      code: generateOrderCode(),
      createdAt: todayISO(),
      note: "",
      totalAmount: 0,
    },
  });

  const { purchaseItems, addItem, deleteItem, updateQuantityItem, updateItem } =
    usePurchaseStore();

  const { mutateAsync: createPurchaseOrder } = useCreatePurchaseOrderMutation();

  const [taxPercent, setTaxPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [quickCreateName, setQuickCreateName] = useState("");
  const [quickCreateIsbn, setQuickCreateIsbn] = useState("");
  const [quickCreatePrice, setQuickCreatePrice] = useState("");

  const [errors] = useState<{ supplier?: string; items?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  const filteredBooks = books?.items.filter((book) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.translations[0]?.title?.toLowerCase().includes(q) ||
      book.translations[0]?.description?.toLowerCase().includes(q)
    );
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (value.trim()) {
      setIsSearching(true);
      searchTimerRef.current = setTimeout(() => setIsSearching(false), 300);
    } else {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowDetail = (purchaseOrderId: string) => {
    setPurchaseOrderId(purchaseOrderId);
  };

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

  const handleOpenQuickCreate = useCallback(() => {
    setQuickCreateName(searchQuery);
    setQuickCreateIsbn("");
    setQuickCreatePrice("");
    setIsSearchOpen(false);
    setSearchQuery("");
    setQuickCreateOpen(true);
  }, [searchQuery]);

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
    console.log("[onSubmit] values:", values);
    console.log("[onSubmit] purchaseItems:", purchaseItems);
    console.log("[onSubmit] subtotal:", subtotal);
    console.log("[onSubmit] taxAmount:", taxAmount);

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

      const res = await createPurchaseOrder(payload);

      console.log("[onSubmit] API success:", res);
    } catch (error) {
      console.error("[onSubmit] API error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onInvalid = (errors: unknown) => {
    console.error("[form invalid] errors:", errors);
    console.log("[form invalid] current values:", form.getValues());
    console.log("[form invalid] purchaseItems:", purchaseItems);
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
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b py-3 px-4">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <ClipboardList className="size-4 text-indigo-500" />
                <CardTitle className="text-sm font-semibold">
                  Thông tin chung
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nhà cung cấp <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Chọn nhà cung cấp..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {!supplierPending &&
                            suppliers?.items?.map((s) => (
                              <SelectItem
                                key={s.id}
                                value={String(s.id)}
                                className="text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <Truck className="size-3.5 text-muted-foreground" />
                                  {s.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Mã đơn nhập
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          className="h-9 text-sm bg-slate-50 dark:bg-slate-900 font-mono cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        Ngày nhập
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <FileText className="size-3.5" />
                        Ghi chú
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Nhập ghi chú cho đơn nhập hàng..."
                          className="min-h-20 text-sm resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

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
              <div ref={searchRef} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Tìm sách theo tên, ISBN hoặc mã..."
                    className="pl-10 h-11 text-sm shadow-sm border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
                  )}
                </div>

                {isSearchOpen && (
                  <div className="absolute z-30 top-full mt-1 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg max-h-72 overflow-y-auto">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Đang tìm kiếm...
                      </div>
                    ) : !bookVariantPending &&
                      filteredBooks &&
                      filteredBooks.length > 0 ? (
                      <div className="py-1">
                        {filteredBooks.map((book) =>
                          book.variants.map((variant) => (
                            <button
                              key={variant.id}
                              type="button"
                              onClick={() => handleAddItem(variant, book)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-left cursor-pointer"
                            >
                              <BookVariantPurchaseItem
                                variant={variant}
                                book={book}
                              />
                            </button>
                          )),
                        )}
                      </div>
                    ) : searchQuery.trim() ? (
                      <div className="py-6 text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Không tìm thấy sản phẩm
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950/30 cursor-pointer"
                          onClick={handleOpenQuickCreate}
                        >
                          <Plus className="size-3.5" />
                          Tạo nhanh sản phẩm mới: &ldquo;{searchQuery}&rdquo;
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4 px-4 text-sm text-muted-foreground">
                        Nhập tên sách, ISBN hoặc mã để tìm kiếm...
                      </div>
                    )}
                  </div>
                )}
              </div>

              {errors.items && (
                <p className="text-xs text-red-500">{errors.items}</p>
              )}

              {purchaseItems.length > 0 ? (
                <>
                  <div className="hidden md:block rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[40%]">
                            Sản phẩm
                          </TableHead>
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[15%] text-center">
                            Định dạng
                          </TableHead>
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[15%] text-center">
                            Số lượng
                          </TableHead>
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[20%] text-right">
                            Đơn giá nhập (₫)
                          </TableHead>
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[18%] text-right">
                            Thành tiền
                          </TableHead>
                          <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[7%] text-center">
                            Xóa
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {purchaseItems.map((item, idx) => (
                          <TableRow
                            key={item.id}
                            className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                          >
                            <TableCell className="py-3">
                              <p className="text-sm font-medium text-foreground">
                                {item.bookVariantName}
                              </p>
                            </TableCell>

                            <TableCell className="py-3">
                              <p className="text-sm font-medium text-foreground text-center">
                                {item.format}
                              </p>
                            </TableCell>

                            <TableCell className="py-3">
                              <Input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(
                                    item.id,
                                    "quantity",
                                    Math.max(1, Number(e.target.value) || 1),
                                  )
                                }
                                className="h-8 w-20 mx-auto text-center text-sm tabular-nums"
                                tabIndex={idx * 2 + 1}
                              />
                            </TableCell>

                            <TableCell className="py-3">
                              <Input
                                type="number"
                                min={0}
                                value={item.unitPrice || ""}
                                placeholder="0"
                                onChange={(e) =>
                                  handleItemChange(
                                    item.id,
                                    "unitPrice",
                                    Math.max(0, Number(e.target.value) || 0),
                                  )
                                }
                                className="h-8 w-32 ml-auto text-right text-sm tabular-nums"
                                tabIndex={idx * 2 + 2}
                              />
                            </TableCell>

                            <TableCell className="py-3 text-right">
                              <span className="text-sm font-semibold tabular-nums text-foreground">
                                {formatCurrency(item.quantity * item.unitPrice)}
                              </span>
                            </TableCell>

                            <TableCell className="py-3 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-500 cursor-pointer"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="md:hidden space-y-3">
                    {purchaseItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {item.bookVariantName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.format}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground font-medium">
                              Số lượng
                            </Label>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  Math.max(1, Number(e.target.value) || 1),
                                )
                              }
                              className="h-8 text-sm text-center"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground font-medium">
                              Đơn giá (₫)
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              value={item.unitPrice || ""}
                              placeholder="0"
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "unitPrice",
                                  Math.max(0, Number(e.target.value) || 0),
                                )
                              }
                              className="h-8 text-sm text-right"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-dashed">
                          <span className="text-xs text-muted-foreground">
                            Thành tiền
                          </span>
                          <span className="text-sm font-semibold tabular-nums">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">
                            Tổng sản phẩm
                          </span>
                          <p className="font-semibold text-foreground">
                            {purchaseItems.length} loại · {totalQty} items
                          </p>
                        </div>

                        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">
                            Thuế (%)
                          </span>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={taxPercent || ""}
                            placeholder="0"
                            onChange={(e) =>
                              setTaxPercent(
                                Math.min(
                                  100,
                                  Math.max(0, Number(e.target.value) || 0),
                                ),
                              )
                            }
                            className="h-8 w-20 text-sm text-center"
                          />
                        </div>

                        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">
                            Tạm tính
                          </span>
                          <p className="font-medium tabular-nums text-foreground">
                            {formatCurrency(subtotal)}
                          </p>
                        </div>

                        {taxPercent > 0 && (
                          <>
                            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />
                            <div className="space-y-1">
                              <span className="text-xs text-muted-foreground">
                                Thuế
                              </span>
                              <p className="font-medium tabular-nums text-foreground">
                                {formatCurrency(taxAmount)}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="text-right space-y-0.5">
                        <span className="text-xs text-muted-foreground">
                          Tổng tiền thanh toán
                        </span>
                        <p className="text-2xl md:text-3xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                          {formatCurrency(grandTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
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

      <Dialog open={quickCreateOpen} onOpenChange={setQuickCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="size-4 text-indigo-500" />
              Tạo nhanh sản phẩm mới
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tên sách <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nhập tên sách..."
                value={quickCreateName}
                onChange={(e) => setQuickCreateName(e.target.value)}
                className="h-9 text-sm"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                ISBN
              </Label>
              <Input
                placeholder="978-xxx-x-xxxxx-x"
                value={quickCreateIsbn}
                onChange={(e) => setQuickCreateIsbn(e.target.value)}
                className="h-9 text-sm font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Giá nhập dự kiến (₫)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={quickCreatePrice}
                onChange={(e) => setQuickCreatePrice(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setQuickCreateOpen(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={() => handleQuickCreate({} as PurchaseItem)}
              className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
              <Plus className="size-4" />
              Lưu & Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="md:hidden h-20" />
    </div>
  );
}
