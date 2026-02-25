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
  ExternalLink,
  Copy,
  CheckCircle2,
  Globe,
  Eye,
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EditBookPage() {
  const router = useRouter();

  const bookData = {
    id: "998877",
    title: "Clean Code - Mã Sạch",
    isActive: true,
    isbn: "9780132350884",
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* 1. TOP BAR: Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full shrink-0"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Chỉnh sửa: {bookData.title}
              </h1>
              <Badge variant="outline" className="font-mono text-[10px]">
                ID: {bookData.id}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="size-3" /> https://yourshop.com/books/
                {bookData.id}
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-primary gap-1"
              >
                <ExternalLink className="size-3" /> Xem thực tế
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/5 border-destructive/20 gap-2"
          >
            <Trash2 className="size-4" /> Xóa đầu sách
          </Button>
          <Separator
            orientation="vertical"
            className="h-8 mx-2 hidden md:block"
          />
          <Button variant="ghost" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 px-8 gap-2 shadow-lg shadow-slate-200">
            <Save className="size-4" /> Cập nhật thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Data */}
        <div className="lg:col-span-8 space-y-8">
          {/* TRANSLATION SECTION */}
          <Card className="shadow-sm overflow-hidden border-indigo-100">
            <CardHeader className="border-b bg-indigo-50/30 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2 text-indigo-700">
                <Languages className="size-5" />
                <CardTitle className="text-lg">Nội dung dịch thuật</CardTitle>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="bg-white border-indigo-200 text-indigo-600 gap-2"
              >
                <Sparkles className="size-3.5" /> AI Dịch lại
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold">Tiêu đề sách</Label>
                  <Input defaultValue={bookData.title} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-muted-foreground">
                    Đường dẫn (Slug)
                  </Label>
                  <div className="relative">
                    <Input
                      defaultValue="clean-code-ma-sach"
                      className="h-11 pr-10 font-mono text-sm bg-slate-50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Mô tả chi tiết</Label>
                <Textarea
                  className="min-h-[300px] leading-relaxed italic"
                  defaultValue="Nội dung tóm tắt cũ của cuốn sách..."
                />
              </div>
            </CardContent>
          </Card>

          {/* VARIANTS MANAGEMENT */}
          <Card className="shadow-sm border-emerald-100">
            <CardHeader className="border-b bg-emerald-50/30 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2 text-emerald-700">
                <Wallet className="size-5" />
                <CardTitle className="text-lg">
                  Danh sách biến thể (Variants)
                </CardTitle>
              </div>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                <Plus className="size-4" /> Thêm định dạng mới
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="w-[120px]">Định dạng</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">Giá nhập</TableHead>
                    <TableHead className="text-right font-bold">
                      Giá bán
                    </TableHead>
                    <TableHead className="text-right">Kho</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      format: "Bìa mềm",
                      isbn: "9780132350884",
                      cost: "250.000",
                      price: "380.000",
                      stock: 45,
                    },
                    {
                      format: "Bìa cứng",
                      isbn: "9780132350999",
                      cost: "450.000",
                      price: "620.000",
                      stock: 12,
                    },
                  ].map((v, i) => (
                    <TableRow key={i} className="group">
                      <TableCell className="font-bold">
                        <Badge variant="secondary">{v.format}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {v.isbn}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {v.cost}đ
                      </TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">
                        {v.price}đ
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">
                          {v.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* STATUS CARD */}
          <Card className="shadow-sm border-2 border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold italic">
                    Trạng thái mở bán
                  </Label>
                  <p className="text-xs text-muted-foreground italic">
                    Cho phép sách xuất hiện trên Store
                  </p>
                </div>
                <Switch
                  defaultChecked={bookData.isActive}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground italic">
                <CheckCircle2 className="size-3 text-emerald-500" /> Cập nhật
                lần cuối: 2 phút trước
              </div>
            </CardContent>
          </Card>

          {/* COVER PREVIEW */}
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="py-3 bg-slate-50 border-b">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Ảnh bìa hiện tại
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden shadow-inner border group relative">
                <img
                  src="https://m.media-amazon.com/images/I/81LFApP99ML.jpg"
                  className="w-full h-full object-cover"
                  alt="Current cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <ImageIcon className="size-4" /> Thay đổi ảnh
                  </Button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  URL Ảnh gốc
                </Label>
                <Input
                  className="h-8 text-[11px] font-mono bg-slate-50"
                  defaultValue="https://covers.openlibrary.org/..."
                />
              </div>
            </CardContent>
          </Card>

          {/* PHYSICAL SPECS (Edited Version) */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 bg-slate-50 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Thông số kỹ thuật
              </CardTitle>
              <Ruler className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Cân nặng (g)
                  </Label>
                  <Input
                    type="number"
                    className="h-9 font-bold"
                    defaultValue={650}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Số trang
                  </Label>
                  <Input type="number" className="h-9" defaultValue={460} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Nhà xuất bản
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="h-9 text-sm font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">Pearson Education</SelectItem>
                      <SelectItem value="2">Addison-Wesley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Năm xuất bản
                  </Label>
                  <Input type="number" className="h-9" defaultValue={2025} />
                </div>
              </div>

              {/* BADGES EDIT */}
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  Nhãn đang gắn
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 cursor-pointer">
                    Bán chạy <Plus className="size-2 ml-1 rotate-45" />
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px] border-dashed border-2"
                  >
                    <Plus className="size-3 mr-1" /> Gắn nhãn mới
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
