import { Ruler, Tag, Plus, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PhysicalSpecsCard = ({ data }: { data?: any }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Ruler className="size-5 text-slate-500" />
          <CardTitle className="text-sm uppercase tracking-widest">
            Thông số kỹ thuật & Xuất bản
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Kích thước & Trọng lượng */}
        <div className="grid grid-cols-2 gap-4">
          <SpecInput
            label="Rộng (cm)"
            name="width"
            defaultValue={data?.width}
          />
          <SpecInput
            label="Cao (cm)"
            name="height"
            defaultValue={data?.height}
          />
          <SpecInput
            label="Dày (cm)"
            name="thickness"
            defaultValue={data?.thickness}
          />
          <SpecInput
            label="Nặng (g)"
            name="weight"
            defaultValue={data?.weight}
            isBold
          />
        </div>

        <Separator />

        {/* Info Section */}
        <div className="space-y-4">
          <FullWidthInput
            label="Tác giả"
            placeholder="Tên tác giả..."
            defaultValue={data?.authors}
          />
          <FullWidthInput
            label="Nhà xuất bản"
            placeholder="Tên nhà xuất bản..."
            defaultValue={data?.publisher}
          />

          <div className="grid grid-cols-2 gap-4">
            <FullWidthInput
              label="Năm XB"
              type="number"
              defaultValue={data?.year}
            />
            <FullWidthInput
              label="Số trang"
              type="number"
              defaultValue={data?.pages}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="pt-2 space-y-3">
          <Label className="text-xs font-bold flex items-center gap-2">
            <Tag className="size-3 text-primary" /> Nhãn gắn kèm (Badges)
          </Label>
          <div className="flex flex-wrap gap-2">
            {["Bán chạy", "Mới về"].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-slate-50 cursor-pointer hover:bg-slate-200"
              >
                {tag}
              </Badge>
            ))}
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

      <FooterAlert />
    </Card>
  );
};

// Helper Components nội bộ để code cleaner
const SpecInput = ({ label, isBold, ...props }: any) => (
  <div className="space-y-1.5">
    <Label className="text-[11px] font-bold text-muted-foreground uppercase">
      {label}
    </Label>
    <Input
      type="number"
      step="0.1"
      className={`h-9 ${isBold ? "font-bold" : ""}`}
      {...props}
    />
  </div>
);

const FullWidthInput = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <Label className="text-xs font-bold">{label}</Label>
    <Input className="h-9" {...props} />
  </div>
);

const FooterAlert = () => (
  <div className="p-4 bg-amber-50 border-t flex gap-3">
    <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
    <p className="text-[10px] text-amber-800 leading-normal font-medium">
      Dữ liệu sau khi tạo sẽ ở trạng thái <b>Inactive</b>. Bạn cần phê duyệt để
      công khai.
    </p>
  </div>
);
