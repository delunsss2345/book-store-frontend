"use client";

import React, { useState } from "react";
import {
  Languages,
  Search,
  Wand2,
  Link2,
  FileText,
  Type,
  Hash,
  Loader2,
  Sparkles,
  Globe2,
  Check,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalAddTranslateBook({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasAIResult, setHasAIResult] = useState(false);

  // Giả lập AI Dịch thuật
  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasAIResult(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 py-2">
      {/* 1. Header & Language Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 shadow-sm">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Dịch thuật nội dung
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quản lý đa ngôn ngữ cho đầu sách
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Label className="hidden sm:block text-xs font-bold text-muted-foreground">
            NGÔN NGỮ:
          </Label>
          <Select defaultValue="1">
            <SelectTrigger className="w-full sm:w-[140px] bg-indigo-50/50 border-indigo-100">
              <Globe2 className="w-4 h-4 mr-2 text-indigo-500" />
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">Tiếng Việt</SelectItem>
              <SelectItem value="2">English</SelectItem>
              <SelectItem value="3">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 2. ISBN & AI Action Card */}
      <Card className="p-4 border-2 border-dashed bg-muted/30 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Nhập ISBN để lấy thông tin gốc..."
              className="pl-9 bg-background focus-visible:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1 md:flex-none">
              <Search className="w-4 h-4 mr-2" /> Kiểm tra
            </Button>
            <Button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="flex-1 md:flex-none bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-none shadow-md transition-all active:scale-95"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2" />
              )}
              AI Dịch thuật
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        {/* 3. Title & Slug Row */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Type className="w-3.5 h-3.5 text-indigo-500" /> Tiêu đề sách
          </Label>
          <Input
            placeholder="Tên sách sau khi dịch..."
            defaultValue={
              hasAIResult ? "Sách Lập Trình React Cho Người Mới" : ""
            }
          />
        </div>

        {/* 4. Description Content */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-indigo-500" /> Mô tả chi
              tiết (Description)
            </Label>
            {hasAIResult && (
              <Badge
                variant="outline"
                className="text-[10px] text-indigo-600 bg-indigo-50 border-indigo-200 animate-in fade-in zoom-in duration-300"
              >
                <Sparkles className="w-3 h-3 mr-1" /> AI Generated
              </Badge>
            )}
          </div>
          <Textarea
            placeholder="Nội dung mô tả nội dung cuốn sách..."
            className="min-h-[180px] leading-relaxed"
            defaultValue={
              hasAIResult
                ? "Đây là cuốn sách hướng dẫn chi tiết về React từ cơ bản đến nâng cao, phù hợp cho mọi trình độ..."
                : ""
            }
          />
        </div>
      </div>

      {/* 5. Footer Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="ghost" className="flex-1" onClick={onClose}>
          Hủy bỏ
        </Button>
        <Button className="flex-[2] bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all">
          Lưu bản dịch
        </Button>
      </div>
    </div>
  );
}
