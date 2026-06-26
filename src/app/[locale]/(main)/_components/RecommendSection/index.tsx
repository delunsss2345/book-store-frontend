import { CatalogBookCardDto } from "@/types/response/catalog.response";
import { useRouter } from "next/navigation";

interface RecommendedSectionProps {
    books: CatalogBookCardDto[];
    title?: string;
}

export default function RecommendedSection({ books, title = "Có thể bạn sẽ thích" }: RecommendedSectionProps) {
    const router = useRouter();

    if (!books?.length) return null;
    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
                <h2 className="text-2xl font-serif italic text-neutral-900">{title}</h2>
                <div className="h-[1px] flex-grow mx-6 bg-neutral-100 hidden md:block" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {books.length} sản phẩm
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                {books.map((book) => (
                    <div onClick={() => router.push(`/detail/${book.slug}`)}
                        key={book.id} className="group cursor-pointer">
                        {/* Container Ảnh: Bỏ p-4, dùng object-cover */}
                        <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4] mb-4">
                            <img
                                src={book.coverImageUrl ?? ""}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt={book.title}
                            />
                            {/* Overlay nhẹ khi hover thay vì nút Add to Cart to đùng */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Text: Căn trái cho tinh tế */}
                        <div className="space-y-1">
                            <h3 className="font-serif text-sm font-bold leading-tight line-clamp-2 uppercase tracking-tight">
                                {book.title}
                            </h3>
                            <p className="text-xs text-neutral-400 italic font-light">Tác phẩm chọn lọc</p>
                            <p className="text-sm font-medium pt-2 border-t border-neutral-100 mt-2">
                                {book?.price + "VND"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}