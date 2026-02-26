import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Package } from "lucide-react";

export default function VariantCreate() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
        <div className="space-y-2">
          <Label>Định dạng</Label>
          <Select defaultValue="PAPERBACK">
            <SelectTrigger className="h-11 z-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="PAPERBACK">Bìa mềm (Paperback)</SelectItem>
              <SelectItem value="HARDCOVER">Bìa cứng (Hardcover)</SelectItem>
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
          <Label className="text-emerald-700 font-bold">Giá bán niêm yết</Label>
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
    </>
  );
}
