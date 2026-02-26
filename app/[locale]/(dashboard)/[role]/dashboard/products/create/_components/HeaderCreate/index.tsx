import { Button } from "@/components/ui/button";
import { Loader2, Save, X } from "lucide-react";

export default function HeaderCreate({
  onSaveHandler,
  isSaving,
}: {
  onSaveHandler: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Thêm sách mới</h1>
        <p className="text-muted-foreground text-sm">
          Điền thông tin chi tiết để tạo sản phẩm trên hệ thống.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <X className="size-4" />
          Hủy
        </Button>
        <Button
          onClick={onSaveHandler}
          disabled={isSaving}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 min-w-[120px]"
        >
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Lưu sách
        </Button>
      </div>
    </div>
  );
}
