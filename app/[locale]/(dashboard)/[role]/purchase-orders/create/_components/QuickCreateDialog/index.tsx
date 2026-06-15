"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PurchaseItem } from "@/features/purchaser-orders/store";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function QuickCreateDialog({
  open,
  onOpenChange,
  initialName,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onConfirm: (newItem: PurchaseItem) => void;
}) {
  const [name, setName] = useState(initialName);
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialName);
      setIsbn("");
      setPrice("");
    }
  }, [open, initialName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={() => onConfirm({} as PurchaseItem)}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            <Plus className="size-4" />
            Lưu & Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
