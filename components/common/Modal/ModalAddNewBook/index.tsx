"use client";

import React, { useState } from "react";
import {
  BookPlus,
  Search,
  Sparkles,
  Image as ImageIcon,
  Building2,
  Hash,
  Calendar,
  Layers,
  Weight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ModalCreateBook({ onClose }: { onClose: () => void }) {
  const [isSearching, setIsSearching] = useState(false);
  const [hasData, setHasData] = useState(false);

  const simulateAutoFill = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasData(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 py-2">
      {/* 1. Header: Tiêu đề và giới thiệu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm">
            <BookPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Thêm sách hệ thống
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Khởi tạo dữ liệu sách gốc cho Admin
            </p>
          </div>
        </div>
        {hasData && (
          <Badge
            variant="outline"
            className="animate-pulse bg-amber-50 text-amber-600 border-amber-200 gap-1"
          >
            <Sparkles className="w-3 h-3" /> Auto-filled
          </Badge>
        )}
      </div>

      {/* 2. ISBN Search Box: Khu vực nhập ISBN để tìm kiếm */}
      <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/5 p-1">
        <div className="flex items-center gap-2 p-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Nhập mã ISBN (ví dụ: 978604...)"
              className="pl-9 bg-background border-none shadow-none focus-visible:ring-0"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={simulateAutoFill}
                  disabled={isSearching}
                  className="shrink-0 shadow-md transition-all active:scale-95"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  {isSearching ? "Đang quét..." : "Tìm nhanh"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Tự động điền thông tin từ thư viện quốc tế
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>

      <div className="space-y-6">
        {/* 3. Grid thông tin chi tiết */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-3.5 h-3.5" /> ID Nhà xuất bản
            </Label>
            <Input placeholder="Ví dụ: 1" defaultValue={hasData ? "1" : ""} />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" /> Năm xuất bản
            </Label>
            <Input
              type="number"
              placeholder="2026"
              defaultValue={hasData ? "2026" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Layers className="w-3.5 h-3.5" /> Số trang
            </Label>
            <Input
              type="number"
              placeholder="320"
              defaultValue={hasData ? "320" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Weight className="w-3.5 h-3.5" /> Trọng lượng (gram)
            </Label>
            <Input
              type="number"
              placeholder="420"
              defaultValue={hasData ? "420" : ""}
            />
          </div>
        </div>

        <Separator />

        {/* 4. Hình ảnh & Preview */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <ImageIcon className="w-3.5 h-3.5" /> Đường dẫn ảnh bìa (URL)
            </Label>
            <Input
              placeholder="https://cdn.example.com/..."
              defaultValue={
                hasData
                  ? "https://m.media-amazon.com/images/I/81LFApP99ML.jpg"
                  : ""
              }
            />
          </div>

          {/* Khu vực Preview ảnh bìa */}
          <div className="relative aspect-[3/2] w-full rounded-xl border-2 border-dashed bg-muted/50 flex items-center justify-center overflow-hidden group">
            {hasData ? (
              <img
                src="https://m.media-amazon.com/images/I/81LFApP99ML.jpg"
                className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                alt="Preview"
              />
            ) : (
              <div className="text-center space-y-2">
                <div className="p-3 bg-background rounded-full inline-block shadow-sm">
                  <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">
                  Preview Cover Image
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Footer: Nút bấm */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Hủy bỏ
        </Button>
        <Button className="flex-1 shadow-lg shadow-primary/20 bg-slate-900 hover:bg-slate-800">
          Xác nhận thêm sách
        </Button>
      </div>
    </div>
  );
}
