"use client";

import { useCreateBookMutation } from "@/features/admin/hooks/use-create-book-mutation";
import { useCategoryQuery } from "@/features/category/hooks/use-category-query";
import { useSearchIsbnMutation } from "@/features/search/hooks/use-search-isbn";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Image as ImageIcon,
  Info,
  Plus,
  Save,
  ScanLine,
  WandSparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {
  createBookSchema,
  CreateBookFormInput,
  CreateBookFormValues,
  scanIsbnSchema,
} from "./_components/book.schema";

const BOOK_FORMAT_OPTIONS = [
  { value: "HARDCOVER", label: "Bìa cứng" },
  { value: "PAPERBACK", label: "Bìa mềm" },
  { value: "EBOOK", label: "E-book" },
  { value: "AUDIOBOOK", label: "Audiobook" },
] as const;

type BookFormatOption = (typeof BOOK_FORMAT_OPTIONS)[number]["value"];

export default function CreateBookPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params.locale || "vi";

  const { data: categoryData } = useCategoryQuery({
    limit: 100,
    isActive: true,
  });
  const categories = categoryData?.data?.items || [];

  const { mutateAsync: searchIsbn, isPending: searchIsbnPending } =
    useSearchIsbnMutation();
  const { mutateAsync: createBook, isPending: createBookPending } =
    useCreateBookMutation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateBookFormInput, unknown, CreateBookFormValues>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      language: "vi",
      lookupIsbn: "",
      title: "",
      description: "",
      authorName: "",
      publisherName: "",
      categoryId: "",
      formatItems: [
        {
          format: "PAPERBACK",
          isbn: "",
          publicationYear: undefined,
          edition: 1,
        },
      ],
      supplierId: "",
      coverImageUrl: "",
      widthCm: undefined,
      heightCm: undefined,
      thicknessCm: undefined,
      weightGrams: undefined,
      pageCount: undefined,
    },
  });

  const language = useWatch({ control, name: "language" }) || "vi";
  const lookupIsbn = useWatch({ control, name: "lookupIsbn" }) || "";
  const coverImageUrl = useWatch({ control, name: "coverImageUrl" });
  const formatItems = useWatch({ control, name: "formatItems" }) || [];
  const selectedFormats = formatItems.map((item) => item.format);

  const toggleFormat = (format: BookFormatOption) => {
    const nextFormatItems = selectedFormats.includes(format)
      ? formatItems.filter((item) => item.format !== format)
      : [
          ...formatItems,
          {
            format,
            isbn: "",
            publicationYear: undefined,
            edition: 1,
          },
        ];

    setValue("formatItems", nextFormatItems, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onScanHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!lookupIsbn.trim()) return;

    const result = scanIsbnSchema.safeParse({ isbn: lookupIsbn.trim() });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message);
      return;
    }

    toast.promise(searchIsbn({ isbn: lookupIsbn.trim(), lang: language }), {
      loading: t("dashboard.products.create.toast.scanLoading"),
      success: (data) => {
        if (data.title) setValue("title", data.title);
        if (data.description) setValue("description", data.description);
        if (data.spec?.widthCm) setValue("widthCm", data.spec.widthCm);
        if (data.spec?.heightCm) setValue("heightCm", data.spec.heightCm);
        if (data.spec?.thicknessCm)
          setValue("thicknessCm", data.spec.thicknessCm);
        if (data.weightGrams) setValue("weightGrams", data.weightGrams);
        if (data.authorName) setValue("authorName", data.authorName);
        if (data.publisherName) setValue("publisherName", data.publisherName);
        if (data.publicationYear) {
          setValue(
            "formatItems",
            getValues("formatItems").map((item) => ({
              ...item,
              publicationYear: data.publicationYear,
            })),
            { shouldDirty: true, shouldValidate: true },
          );
        }
        if (data.pageCount) setValue("pageCount", data.pageCount);
        if (data.coverImageUrl) setValue("coverImageUrl", data.coverImageUrl);
        return t("dashboard.products.create.toast.scanSuccess");
      },
      error: t("dashboard.products.create.toast.scanError"),
    });
  };

  const onSubmit = async (data: CreateBookFormValues) => {
    const authors = data.authorName
      .split(",")
      .map((author: string, i: number) => ({
        authorName: author.trim(),
        isPrimary: i === 0,
      }));

    const bookData = {
      title: data.title,
      description: data.description,
      publisherName: data.publisherName,
      bookVariantItems: data.formatItems.map((item) => ({
        format: item.format,
        isbn: item.isbn,
        publicationYear: item.publicationYear,
        edition: item.edition,
      })),
      authors,
      categories: [
        {
          categoryId: Number(data.categoryId),
        },
      ],
      spec: {
        widthCm: data.widthCm,
        heightCm: data.heightCm,
        thicknessCm: data.thicknessCm,
      },
      pageCount: data.pageCount,
      badgeCode: "NEW",
      coverImageUrl: data.coverImageUrl || undefined,
    };

    toast.promise(
      createBook(bookData).then(() => {
        router.push(`/${locale}/dashboard/books`);
      }),
      {
        loading: t("dashboard.products.create.toast.createLoading"),
        success: t("dashboard.products.create.toast.createSuccess"),
        error: t("dashboard.products.create.toast.createError"),
      },
    );
  };

  const onSaveHandler = handleSubmit(onSubmit);

  return (
    <div className="min-w-0">
      <div className="topbar">
        <button
          className="icon-btn"
          onClick={() => router.push(`/${locale}/dashboard/books`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <div className="text-[15px] font-semibold text-ink">
            Thêm sách mới
          </div>
          <div className="text-[11px] text-ink-3">
            Điền thông tin chi tiết để tạo sản phẩm trên hệ thống.
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="bdg bdg-gray">Draft</span>
          <button
            className="btn-soft rounded-lg px-3.5 py-2 text-[12.5px]"
            onClick={() => router.push(`/${locale}/dashboard/books`)}
          >
            Hủy
          </button>
          <button
            className="btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
            onClick={onSaveHandler}
            disabled={createBookPending}
          >
            <Save className="h-4 w-4" /> Lưu sách
          </button>
        </div>
      </div>
      <div className="page">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px]">
          <span className="chip bg-ink text-white">1 · Quét ISBN</span>
          <ChevronRight className="h-4 w-4 text-ink-3" />
          <span className="chip bg-paper text-ink-2 ring-1 ring-line">
            2 · Điền nội dung
          </span>
          <ChevronRight className="h-4 w-4 text-ink-3" />
          <span className="chip bg-paper text-ink-2 ring-1 ring-line">
            3 · Lưu nháp
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-gradient-to-r from-accent-soft to-paper px-5 py-3">
                <WandSparkles className="h-4 w-4 text-accent" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Nhập ISBN để điền nhanh (Magic Fill)
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
                <div className="w-40">
                  <label className="flabel">Ngôn ngữ</label>
                  <select className="field" {...register("language")}>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="flabel">ISBN tra cứu nhanh</label>
                  <input
                    className="field font-mono"
                    placeholder="Ví dụ: 9780135398548"
                    {...register("lookupIsbn")}
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

            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">
                Nội dung hiển thị
              </h4>
              <div className="mt-4">
                <label className="flabel">
                  Tiêu đề sách <span className="text-accent">*</span>
                </label>
                <input
                  className={`field ${errors.title ? "border-red-500" : ""}`}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="flabel">Mô tả chi tiết</label>
                <textarea
                  className="field h-28 py-2.5"
                  placeholder="Mô tả nội dung sách…"
                  {...register("description")}
                ></textarea>
              </div>
            </div>

            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">
                Thông số kỹ thuật & Xuất bản
              </h4>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                Kích thước
              </p>
              <div className="mt-2 grid grid-cols-4 gap-3">
                <div>
                  <label className="flabel">Rộng (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="field"
                    {...register("widthCm")}
                  />
                </div>
                <div>
                  <label className="flabel">Cao (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="field"
                    {...register("heightCm")}
                  />
                </div>
                <div>
                  <label className="flabel">Dày (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="field"
                    {...register("thicknessCm")}
                  />
                </div>
                <div>
                  <label className="flabel">Nặng (g)</label>
                  <input
                    type="number"
                    className="field"
                    {...register("weightGrams")}
                  />
                </div>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                Xuất bản & Phân loại
              </p>
              <div className="mt-2 grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="flabel">
                    Tác giả <span className="text-accent">*</span>
                  </label>
                  <input
                    className={`field ${errors.authorName ? "border-red-500" : ""}`}
                    placeholder="Cách nhau bằng dấu phẩy"
                    {...register("authorName")}
                  />
                  {errors.authorName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.authorName.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="flabel">
                    Nhà xuất bản <span className="text-accent">*</span>
                  </label>
                  <input
                    className={`field ${errors.publisherName ? "border-red-500" : ""}`}
                    {...register("publisherName")}
                  />
                  {errors.publisherName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.publisherName.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="flabel">
                    Danh mục <span className="text-accent">*</span>
                  </label>
                  <select
                    className={`field ${errors.categoryId ? "border-red-500" : ""}`}
                    {...register("categoryId")}
                  >
                    <option value="">Chọn danh mục...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
                <div className="col-span-4">
                  <label className="flabel">
                    Định dạng muốn tạo <span className="text-accent">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {BOOK_FORMAT_OPTIONS.map((format) => {
                      const checked = selectedFormats.includes(format.value);

                      return (
                        <button
                          key={format.value}
                          type="button"
                          onClick={() => toggleFormat(format.value)}
                          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-[12.5px] font-medium transition-colors ${
                            checked
                              ? "border-ink bg-ink text-white"
                              : "border-line bg-paper text-ink-2 hover:border-ink hover:text-ink"
                          }`}
                          aria-pressed={checked}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              checked
                                ? "border-white bg-white text-ink"
                                : "border-line-2 bg-white text-transparent"
                            }`}
                          >
                            <Check className="h-3 w-3" />
                          </span>
                          {format.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.formatItems && !Array.isArray(errors.formatItems) && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.formatItems.message}
                    </p>
                  )}
                </div>
              </div>
              {formatItems.length > 0 && (
                <div className="mt-4 overflow-hidden rounded-lg border border-line">
                  <div className="hidden grid-cols-4 gap-3 border-b border-line bg-paper px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3 md:grid">
                    <span>Định dạng</span>
                    <span>ISBN</span>
                    <span>Năm XB</span>
                    <span>Lần tái bản</span>
                  </div>
                  <div className="divide-y divide-line">
                    {formatItems.map((item, index) => {
                      const formatLabel =
                        BOOK_FORMAT_OPTIONS.find(
                          (format) => format.value === item.format,
                        )?.label ?? item.format;
                      const itemError = Array.isArray(errors.formatItems)
                        ? errors.formatItems[index]
                        : undefined;

                      return (
                        <div
                          key={item.format}
                          className="grid grid-cols-1 gap-3 px-3 py-3 md:grid-cols-4"
                        >
                          <input
                            type="hidden"
                            {...register(`formatItems.${index}.format`)}
                          />
                          <div>
                            <label className="flabel sm:hidden">
                              Định dạng
                            </label>
                            <div className="field flex items-center bg-paper font-medium">
                              {formatLabel}
                            </div>
                          </div>
                          <div>
                            <label className="flabel sm:hidden">ISBN</label>
                            <input
                              className={`field font-mono text-[12px] ${itemError?.isbn ? "border-red-500" : ""}`}
                              placeholder="ISBN riêng cho format"
                              {...register(`formatItems.${index}.isbn`)}
                            />
                            {itemError?.isbn && (
                              <p className="mt-1 text-xs text-red-500">
                                {itemError.isbn.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="flabel sm:hidden">Năm XB</label>
                            <input
                              type="number"
                              className={`field ${itemError?.publicationYear ? "border-red-500" : ""}`}
                              {...register(
                                `formatItems.${index}.publicationYear`,
                              )}
                            />
                            {itemError?.publicationYear && (
                              <p className="mt-1 text-xs text-red-500">
                                {itemError.publicationYear.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="flabel sm:hidden">
                              Lần tái bản
                            </label>
                            <input
                              type="number"
                              min="1"
                              className={`field ${itemError?.edition ? "border-red-500" : ""}`}
                              {...register(`formatItems.${index}.edition`)}
                            />
                            {itemError?.edition && (
                              <p className="mt-1 text-xs text-red-500">
                                {itemError.edition.message}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-3 grid grid-cols-4 gap-3">
                <div>
                  <label className="flabel">Số trang chung</label>
                  <input
                    type="number"
                    className="field"
                    {...register("pageCount")}
                  />
                </div>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                Nhãn
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button className="btn-soft rounded-full px-3 py-1 text-[11px]">
                  <Plus className="h-3.5 w-3.5" /> Thêm nhãn
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h4 className="display text-[17px] font-semibold text-ink">
                Ảnh bìa & Preview
              </h4>
              <div className="mt-3 grid aspect-[3/4] overflow-hidden place-items-center rounded-xl border-2 border-dashed border-line-2 bg-paper text-center">
                {coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverImageUrl}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div>
                    <ImageIcon className="mx-auto text-[26px] text-ink-3" />
                    <div className="mt-2 text-[13px] font-medium text-ink-2">
                      Chưa có ảnh bìa
                    </div>
                    <div className="text-[11px] text-ink-3">
                      Dán URL hoặc dùng Magic Fill
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flabel">Đường dẫn ảnh (URL)</label>
                <input
                  className={`field font-mono text-[12px] ${errors.coverImageUrl ? "border-red-500" : ""}`}
                  placeholder="https://…"
                  {...register("coverImageUrl")}
                />
                {errors.coverImageUrl && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.coverImageUrl.message}
                  </p>
                )}
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-medium text-ink-2">
                  Trạng thái tạo
                </span>
                <span className="bdg bdg-gray">Draft</span>
              </div>
              <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-[12px] text-amber-800 ring-1 ring-inset ring-amber-600/20">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Dữ liệu sau khi tạo sẽ ở trạng thái <strong>Inactive</strong>.
                  Bạn cần phê duyệt để công khai.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
