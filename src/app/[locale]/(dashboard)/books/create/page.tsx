"use client";

import { useCreateBookAllMutation } from "@/features/admin/hooks/use-create-book-all";
import { useCategoryQuery } from "@/features/category/hooks/use-category-query";
import { useSearchIsbnMutation } from "@/features/search/hooks/use-search-isbn";
import { useSearchStore } from "@/features/search/store/search.store";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { AdminBookVariant } from "@/types/response/admin.response";
import { convertIsbnResultToBookSchema } from "@/utils/convert-book";
import { ArrowLeft, ChevronRight, Image as ImageIcon, Info, Plus, Save, ScanLine, WandSparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import VariantCreate from "./_components/VariantCreate";

export default function CreateBookPage() {
  const t = useTranslations();
  const [variants, setVariants] = useState<AdminBookVariant[]>([]);
  const [language, setLanguage] = useState<string>("vi");
  const [categoryId, setCategoryId] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("");
  const [isbn, setIsbn] = useState("");

  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierQuery();
  const suppliers = supplierData?.items || [];

  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryQuery({
    limit: 100,
    isActive: true,
  });
  const categories = categoryData?.data?.items || [];

  const { isbnSearchResult } = useSearchStore();
  const { mutateAsync: searchIsbn, isPending: searchIsbnPending } =
    useSearchIsbnMutation();

  const { mutateAsync: createBookAll, isPending: createBookAllPending } =
    useCreateBookAllMutation();

  const onScanHandler = () => {
    if (!isbn.trim()) return;
    toast.promise(searchIsbn({ isbn: isbn.trim(), lang: language }), {
      loading: t("dashboard.products.create.toast.scanLoading"),
      success: t("dashboard.products.create.toast.scanSuccess"),
      error: t("dashboard.products.create.toast.scanError"),
    });
  };

  const onSaveHandler = async () => {
    const bookData = convertIsbnResultToBookSchema(
      isbnSearchResult,
      variants,
      language,
    );
    if (!bookData) return;
    toast.promise(createBookAll(bookData), {
      loading: t("dashboard.products.create.toast.createLoading"),
      success: t("dashboard.products.create.toast.createSuccess"),
      error: t("dashboard.products.create.toast.createError"),
    });
  };

  return (
    <div className="min-w-0">
      <div className="topbar">
        <button className="icon-btn"><ArrowLeft className="h-4 w-4" /></button>
        <div>
          <div className="text-[15px] font-semibold text-ink">Thêm sách mới</div>
          <div className="text-[11px] text-ink-3">Điền thông tin chi tiết để tạo sản phẩm trên hệ thống.</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="bdg bdg-gray">Draft</span>
          <button className="btn-soft rounded-lg px-3.5 py-2 text-[12.5px]">Hủy</button>
          <button 
            className="btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
            onClick={onSaveHandler}
            disabled={createBookAllPending}
          >
            <Save className="h-4 w-4" /> Lưu sách
          </button>
        </div>
      </div>
      <div className="page">
        {/* step chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px]">
          <span className="chip bg-ink text-white">1 · Quét ISBN</span><ChevronRight className="h-4 w-4 text-ink-3" />
          <span className="chip bg-paper text-ink-2 ring-1 ring-line">2 · Điền nội dung</span><ChevronRight className="h-4 w-4 text-ink-3" />
          <span className="chip bg-paper text-ink-2 ring-1 ring-line">3 · Lưu nháp</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {/* magic fill */}
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-gradient-to-r from-accent-soft to-paper px-5 py-3">
                <WandSparkles className="h-4 w-4 text-accent" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">Nhập ISBN để điền nhanh (Magic Fill)</span>
              </div>
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
                <div className="w-40">
                  <label className="flabel">Ngôn ngữ</label>
                  <select className="field" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="flabel">Mã ISBN</label>
                  <input 
                    className="field font-mono" 
                    placeholder="Ví dụ: 9780135398548" 
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                <button 
                  className="btn-accent rounded-lg px-4 py-2.5 text-[13px]"
                  onClick={onScanHandler}
                  disabled={searchIsbnPending}
                >
                  <ScanLine className="h-4 w-4" /> Quét dữ liệu
                </button>
              </div>
            </div>

            {/* content */}
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">Nội dung hiển thị</h4>
              <div className="mt-4">
                <label className="flabel">Tiêu đề sách <span className="text-accent">*</span></label>
                <input className="field" defaultValue={isbnSearchResult?.title || ""} key={`title-${isbnSearchResult?.title}`} />
              </div>
              <div className="mt-4">
                <label className="flabel">Mô tả chi tiết</label>
                <textarea 
                  className="field h-28 py-2.5" 
                  placeholder="Mô tả nội dung sách…"
                  defaultValue={isbnSearchResult?.description || ""}
                  key={`desc-${isbnSearchResult?.description}`}
                ></textarea>
              </div>
            </div>

            {/* variants */}
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <h4 className="display text-[17px] font-semibold text-ink">Biến thể & Giá bán</h4>
                <div className="flex items-center gap-2">
                  <span className="bdg bdg-gray">Mặc định</span>
                  <span className="bdg bdg-blue">{variants.length} biến thể</span>
                </div>
              </div>
              <div className="mt-4">
                <VariantCreate variants={variants} setVariants={setVariants} />
              </div>
            </div>

            {/* physical specs */}
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">Thông số kỹ thuật & Xuất bản</h4>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Kích thước</p>
              <div className="mt-2 grid grid-cols-4 gap-3">
                <div><label className="flabel">Rộng (cm)</label><input className="field" defaultValue={isbnSearchResult?.spec?.widthCm || ""} /></div>
                <div><label className="flabel">Cao (cm)</label><input className="field" defaultValue={isbnSearchResult?.spec?.heightCm || ""} /></div>
                <div><label className="flabel">Dày (cm)</label><input className="field" defaultValue={isbnSearchResult?.spec?.thicknessCm || ""} /></div>
                <div><label className="flabel">Nặng (g)</label><input className="field" defaultValue={isbnSearchResult?.weightGrams || ""} /></div>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Xuất bản & Phân loại</p>
              <div className="mt-2 grid grid-cols-4 gap-3">
                <div><label className="flabel">Tác giả</label><input className="field" defaultValue={isbnSearchResult?.authorName || ""} /></div>
                <div><label className="flabel">Nhà xuất bản</label><input className="field" defaultValue={isbnSearchResult?.publisherName || ""} /></div>
                <div className="col-span-2">
                  <label className="flabel">Danh mục</label>
                  <select className="field" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Chọn danh mục...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                <div><label className="flabel">Năm XB</label><input className="field" defaultValue={isbnSearchResult?.publicationYear || ""} /></div>
                <div><label className="flabel">Số trang</label><input className="field" defaultValue={isbnSearchResult?.pageCount || ""} /></div>
                <div className="col-span-2">
                  <label className="flabel">Nhà cung cấp</label>
                  <select className="field" value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                    <option value="">Chọn nhà cung cấp...</option>
                    {suppliers.map((sup) => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Nhãn</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button className="btn-soft rounded-full px-3 py-1 text-[11px]"><Plus className="h-3.5 w-3.5" /> Thêm nhãn</button>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="space-y-4">
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">Ảnh bìa & Preview</h4>
              <div className="mt-3 grid aspect-[3/4] overflow-hidden place-items-center rounded-xl border-2 border-dashed border-line-2 bg-paper text-center">
                {isbnSearchResult?.coverImageUrl ? (
                  <img src={isbnSearchResult.coverImageUrl} alt="Cover" className="h-full w-full object-cover" />
                ) : (
                  <div>
                    <ImageIcon className="mx-auto text-[26px] text-ink-3" />
                    <div className="mt-2 text-[13px] font-medium text-ink-2">Chưa có ảnh bìa</div>
                    <div className="text-[11px] text-ink-3">Dán URL hoặc dùng Magic Fill</div>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flabel">Đường dẫn ảnh (URL)</label>
                <input className="field font-mono text-[12px]" placeholder="https://…" defaultValue={isbnSearchResult?.coverImageUrl || ""} />
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-medium text-ink-2">Trạng thái tạo</span>
                <span className="bdg bdg-gray">Draft</span>
              </div>
              <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-[12px] text-amber-800 ring-1 ring-inset ring-amber-600/20">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Dữ liệu sau khi tạo sẽ ở trạng thái <strong>Inactive</strong>. Bạn cần phê duyệt để công khai.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
