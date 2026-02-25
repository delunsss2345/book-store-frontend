"use client";

import React from "react";
import {
  BookPlus,
  Search,
  Sparkles,
  ImageIcon,
  Building2,
  Hash,
  Calendar,
  Layers,
  Weight,
  Languages,
  Wallet,
  Box,
  Ruler,
  Tag,
  Package,
  Check,
  Info,
  LayoutGrid,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ModalQuickCreateBook({
  onClose,
}: {
  onClose: () => void;
}) {
  // UI Only: Giả định trạng thái sau khi Magic Fill thành công
  const hasData = true;

  return (
    <div className="flex flex-col h-[85vh]">
      {/* --- HEADER & ISBN MAGIC FILL --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 shrink-0 px-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm">
            <BookPlus className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Thêm Sách Tổng Lực
            </h2>
            <p className="text-xs text-muted-foreground italic">
              Nhập ISBN để tự động điền 90% dữ liệu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="978..."
              className="h-9 pl-8 border-none bg-transparent focus-visible:ring-0 shadow-none"
            />
          </div>
          <Button size="sm" className="h-9 px-4 shadow-sm gap-2">
            <Search className="size-3.5" />
            <span>Magic Fill</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-10 pb-10 px-1">
          {/* --- SECTION 1: NỘI DUNG DỊCH THUẬT (Translation) --- */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-xs">
              <Languages className="size-4" />
              <span>Nội dung hiển thị (Vietnamese)</span>
            </div>
            <div className="grid gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Tiêu đề sách *</Label>
                <Input
                  placeholder="Nhập tiêu đề hiển thị cho khách hàng..."
                  defaultValue={hasData ? "Clean Code - Mã Sạch" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Mô tả sách</Label>
                <Textarea
                  placeholder="Viết lời dẫn hấp dẫn cho cuốn sách..."
                  className="min-h-[120px] text-sm leading-relaxed"
                  defaultValue={
                    hasData
                      ? "Cuốn sách kinh điển của Robert C. Martin hướng dẫn về kỹ thuật viết mã sạch, tối ưu hóa hiệu suất..."
                      : ""
                  }
                />
              </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* --- SECTION 2: THÔNG TIN GỐC (Book) --- */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-wider text-xs">
              <Building2 className="size-4" />
              <span>Thông số xuất bản (Root Book)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-semibold">Nhà xuất bản</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Chọn NXB" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="1">
                      Pearson Education / Addison-Wesley
                    </SelectItem>
                    <SelectItem value="2">NXB Trẻ</SelectItem>
                    <SelectItem value="3">NXB Tổng Hợp TP.HCM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Năm XB</Label>
                <Input
                  type="number"
                  placeholder="2024"
                  defaultValue={hasData ? 2024 : ""}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Số trang</Label>
                <Input
                  type="number"
                  placeholder="0"
                  defaultValue={hasData ? 450 : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  Cân nặng (Grams)
                </Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="number"
                    className="pl-9"
                    placeholder="VD: 500"
                    defaultValue={hasData ? 650 : ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Ảnh bìa URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    className="pl-9 font-mono text-xs"
                    placeholder="https://..."
                    defaultValue={
                      hasData
                        ? "https://covers.openlibrary.org/b/id/9249618-L.jpg"
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* --- SECTION 3: THƯƠNG MẠI (Variant) --- */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-xs">
                <Wallet className="size-4" />
                <span>Giá bán & Kho vận (First Variant)</span>
              </div>
              <Badge
                variant="outline"
                className="text-emerald-600 bg-emerald-50 border-emerald-200"
              >
                <Sparkles className="size-3 mr-1" /> New Variant
              </Badge>
            </div>

            <Card className="bg-slate-50/50 border-dashed border-2 shadow-none">
              <CardContent className="p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Định dạng</Label>
                    <Select defaultValue="PAPERBACK">
                      <SelectTrigger className="bg-background h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="PAPERBACK">
                          Bìa mềm (Paperback)
                        </SelectItem>
                        <SelectItem value="HARDCOVER">
                          Bìa cứng (Hardcover)
                        </SelectItem>
                        <SelectItem value="EBOOK">E-Book</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">ISBN Biến thể</Label>
                    <Input
                      className="h-9 bg-background"
                      placeholder="978..."
                      defaultValue={hasData ? "9780132350884" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Lần tái bản</Label>
                    <Input
                      type="number"
                      className="h-9 bg-background"
                      defaultValue={1}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Giá nhập</Label>
                    <Input
                      type="number"
                      className="h-9 bg-background border-amber-200"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-emerald-700">
                      Giá bán niêm yết
                    </Label>
                    <Input
                      type="number"
                      className="h-9 bg-background border-emerald-300"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Tiền tệ</Label>
                    <Select defaultValue="VND">
                      <SelectTrigger className="h-9 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="VND">VNĐ</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Số lượng kho</Label>
                    <div className="relative">
                      <Package className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        className="h-9 pl-8 bg-background"
                        defaultValue={50}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* --- SECTION 4: MỞ RỘNG (Specs & Badges) --- */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="specs"
              className="border-none bg-muted/30 rounded-xl px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider text-xs">
                  <Ruler className="size-4" />
                  <span>Kích thước & Đóng gói (Optional Specs)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-2">
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase font-bold text-muted-foreground">
                      Rộng (cm)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      className="bg-background h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase font-bold text-muted-foreground">
                      Cao (cm)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      className="bg-background h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase font-bold text-muted-foreground">
                      Dày (cm)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      className="bg-background h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase font-bold text-muted-foreground">
                      Quy cách
                    </Label>
                    <Input
                      className="bg-background h-8 text-xs"
                      placeholder="Màng co, hộp..."
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="badges"
              className="border-none bg-muted/30 rounded-xl px-4 mt-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider text-xs">
                  <Tag className="size-4" />
                  <span>Nhãn sách (Badges)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Bán chạy",
                    "Mới về",
                    "Khuyên đọc",
                    "Limited Edition",
                    "Sách ký tên",
                  ].map((badge) => (
                    <Button
                      key={badge}
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-[11px] rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {badge}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-3 text-[11px] rounded-full border-dashed border-2"
                  >
                    + Thêm nhãn
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>

      {/* --- FOOTER ACTIONS --- */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t mt-auto shrink-0 bg-background">
        <div className="hidden md:flex items-center gap-2 text-muted-foreground">
          <Info className="size-4" />
          <span className="text-[11px]">
            Sách mới tạo sẽ ở trạng thái <b>Inactive</b> để kiểm duyệt.
          </span>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="ghost" className="flex-1 md:w-32" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button className="flex-1 md:w-48 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200">
            Xác nhận tạo Sách
          </Button>
        </div>
      </div>
    </div>
  );
}
