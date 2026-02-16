"use client";

import BookCard from "@/app/(main)/_components/BookCard";
import { useHomeMutation } from "@/features/catalog/hooks/use-home.mutation";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { PricedBook } from "@/types/response/catalog.response";
import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";

function toNumberPrice(v?: string | number | null) {
    if (v == null) return undefined;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : undefined;
}

function SectionHeader({
    title,
    count,
    viewAllHref,
}: {
    title: string;
    count?: number;
    viewAllHref?: string;
}) {
    return (
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-lg font-bold tracking-tight">{title}</h2>
                {typeof count === "number" && (
                    <p className="mt-1 text-sm text-zinc-500">{count} titles</p>
                )}
            </div>

            {viewAllHref && (
                <Link
                    href={viewAllHref}
                    className="text-xs uppercase tracking-wider text-zinc-700 hover:text-zinc-900"
                >
                    View all
                </Link>
            )}
        </div>
    );
}

export function HomeBook() {
    const mutationHome = useHomeMutation();
    const home = useCatalogStore((s) => s.home);

    const getHome = useCallback(async () => {
        return mutationHome.mutateAsync();
    }, [mutationHome]);

    useEffect(() => {
        if (home) return;
        getHome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newArrivals = home?.newArrivals ?? [];
    const bestSeller = home?.bestSeller ?? [];

    // Map price từ bestSeller theo id (nếu BookCard cần price)
    const bestSellerPriceById = useMemo(() => {
        const m = new Map<string, number>();
        for (const b of bestSeller) {
            const min = toNumberPrice((b as any).minPrice);
            if (min != null) m.set(b.id, min);
        }
        return m;
    }, [bestSeller]);

    return (
        <section className="container-main w-full pb-12">
            <div className="mt-2">
                <SectionHeader
                    title="New Arrivals"
                    count={newArrivals.length}
                    viewAllHref="/books"
                />

                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                    {newArrivals.map((b) => (
                        <BookCard
                            key={b.id}
                            title={b.title}
                            subtitle="" // newArrivals không có subtitle
                            // nếu BookCard bắt buộc price thì lấy tạm từ bestSeller map, không có thì undefined/0
                            price={bestSellerPriceById.get(b.id) ?? 0}
                            badge="NEW"
                            imageUrl={b.coverImageUrl}
                            href={`/detail/${b.slug ?? b.id}`}
                            variant="compact"
                        />
                    ))}
                </div>

                {!mutationHome.isPending && newArrivals.length === 0 && (
                    <div className="mt-10 rounded border border-dashed p-8 text-center text-sm text-zinc-500">
                        No new arrivals yet.
                    </div>
                )}
            </div>

            {/* ── Best Seller ── */}
            {bestSeller.length > 0 && (
                <div className="mt-14">
                    <SectionHeader
                        title="Best Seller"
                        count={bestSeller.length}
                        viewAllHref="/books?sort=best-seller"
                    />

                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                        {bestSeller.map((b: PricedBook) => (
                            <BookCard
                                key={b.id}
                                title={b.title}
                                subtitle="" // API chưa có
                                price={toNumberPrice(b.minPrice) ?? 0}
                                badge="HOT"
                                imageUrl={b.coverImageUrl}
                                href={`/detail/${b.slug ?? b.id}`}
                                variant="compact"
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
