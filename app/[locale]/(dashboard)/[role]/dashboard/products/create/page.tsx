"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Save,
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
  Package,
  Ruler,
  Tag,
  AlertCircle,
  Trash2,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateBookPage() {
  const router = useRouter();
  const hasData = true;

  return (
    /* Dùng container max-w-1600px theo ý bạn */
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* 1. TOP BAR: Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Thêm đầu sách mới
            </h1>
            <p className="text-sm text-muted-foreground">
              Khởi tạo dữ liệu gốc và các bản dịch cho hệ thống
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()}>
            Hủy bỏ
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 px-8 gap-2 shadow-lg shadow-slate-200">
            <Save className="size-4" /> Lưu hệ thống
          </Button>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: 8 Units */}
        <div className="lg:col-span-8 space-y-8">
          {/* ISBN MAGIC SEARCH */}
          <Card className="border-primary/20 bg-primary/5 shadow-none border-2 border-dashed">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="text-primary font-bold flex items-center gap-2">
                    <Sparkles className="size-4" /> NHẬP ISBN ĐỂ ĐIỀN NHANH
                    (MAGIC FILL)
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Ví dụ: 9780135398548"
                      className="pl-10 h-12 bg-white text-lg font-mono"
                    />
                  </div>
                </div>
                <Button size="lg" className="h-12 px-10 shadow-md">
                  <Search className="size-4 mr-2" /> Quét dữ liệu
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TRANSLATION & CONTENT */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-600">
                <Languages className="size-5" />
                <CardTitle className="text-lg">
                  Nội dung hiển thị (Vietnamese)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold">Tiêu đề sách *</Label>
                <Input
                  placeholder="Tên sách sẽ hiển thị trên web..."
                  className="h-11"
                  defaultValue={hasData ? "Clean Code - Mã Sạch" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Mô tả chi tiết</Label>
                <Textarea
                  placeholder="Nội dung giới thiệu về sách..."
                  className="min-h-[250px] leading-relaxed text-base"
                  defaultValue={
                    hasData
                      ? "Cuốn sách kinh điển của Robert C. Martin hướng dẫn về các kỹ thuật viết mã chuyên nghiệp..."
                      : ""
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* VARIANT & PRICING */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Wallet className="size-5" />
                  <CardTitle className="text-lg">Biến thể & Giá bán</CardTitle>
                </div>
                <Badge className="bg-emerald-500">Mặc định</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Định dạng</Label>
                  <Select defaultValue="PAPERBACK">
                    <SelectTrigger className="h-11">
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
                  <Label>Số lượng tồn kho</Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      className="pl-10 h-11 font-bold text-emerald-600"
                      defaultValue={50}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lần tái bản</Label>
                  <Input type="number" className="h-11" defaultValue={1} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Giá nhập (Cost Price)</Label>
                  <Input type="number" className="h-11" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-700 font-bold">
                    Giá bán niêm yết
                  </Label>
                  <Input
                    type="number"
                    className="h-11 border-emerald-200 focus-visible:ring-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Đơn vị tiền tệ</Label>
                  <Select defaultValue="VND">
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="VND">VNĐ (Việt Nam Đồng)</SelectItem>
                      <SelectItem value="USD">USD (Đô la Mỹ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: 4 Units */}
        <div className="lg:col-span-4 space-y-8">
          {/* IMAGE PREVIEW */}
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ImageIcon className="size-5 text-slate-500" />
                <CardTitle className="text-sm uppercase tracking-widest">
                  Ảnh bìa & Preview
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="aspect-[3/4] rounded-xl bg-slate-100 border-2 border-dashed flex items-center justify-center relative overflow-hidden group shadow-inner">
                {hasData ? (
                  <img
                    src="https://m.media-amazon.com/images/I/81LFApP99ML.jpg"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    alt="Cover"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="size-12 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs text-slate-400">Chưa có ảnh bìa</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs">URL Ảnh bìa</Label>
                <Input
                  placeholder="Dán link ảnh tại đây..."
                  className="text-xs font-mono"
                  defaultValue={
                    hasData ? "https://covers.openlibrary.org/..." : ""
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* PHYSICAL SPECS & DETAILS */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Ruler className="size-5 text-slate-500" />
                <CardTitle className="text-sm uppercase tracking-widest">
                  Thông số kỹ thuật
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase">
                    Rộng (cm)
                  </Label>
                  <Input type="number" step="0.1" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase">
                    Cao (cm)
                  </Label>
                  <Input type="number" step="0.1" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase">
                    Dày (cm)
                  </Label>
                  <Input type="number" step="0.1" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase">
                    Nặng (g)
                  </Label>
                  <Input
                    type="number"
                    className="h-9 font-bold"
                    defaultValue={hasData ? 650 : ""}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Nhà xuất bản</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">Pearson Education</SelectItem>
                      <SelectItem value="2">Addison-Wesley</SelectItem>
                      <SelectItem value="3">NXB Trẻ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Năm XB</Label>
                    <Input type="number" className="h-9" defaultValue={2025} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Số trang</Label>
                    <Input type="number" className="h-9" defaultValue={460} />
                  </div>
                </div>
              </div>

              {/* BADGES SECTION */}
              <div className="pt-2 space-y-3">
                <Label className="text-xs font-bold flex items-center gap-2">
                  <Tag className="size-3 text-primary" /> Nhãn gắn kèm (Badges)
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-slate-50 cursor-pointer hover:bg-slate-200"
                  >
                    Bán chạy
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-slate-50 cursor-pointer hover:bg-slate-200"
                  >
                    Mới về
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px] border-dashed border"
                  >
                    <Plus className="size-3 mr-1" /> Thêm nhãn
                  </Button>
                </div>
              </div>
            </CardContent>

            <div className="p-4 bg-amber-50 border-t flex gap-3">
              <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-normal font-medium">
                Dữ liệu sau khi tạo sẽ ở trạng thái <b>Inactive</b>. Bạn cần phê
                duyệt tại danh sách sản phẩm để công khai.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
