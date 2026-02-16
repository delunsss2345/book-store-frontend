"use client";

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

    const newAndTrending = useMemo(() => home?.newAndTrending ?? [], [home]);

    // Map price từ bestSeller theo id (nếu BookCard cần price)
    const bestSellerPriceById = useMemo(() => {
        const m = new Map<string, number>();
        for (const b of newAndTrending) {
            const min = toNumberPrice((b as PricedBook).minPrice);
            if (min != null) m.set(b.id, min);
        }
        return m;
    }, [newAndTrending]);

    return (
        <section className="container-main py-10">
            <div>
                {/* Title centered giống ảnh 2 */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-wide">New &amp; Trending</h2>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
                    {newAndTrending.map((b) => {
                        const price = bestSellerPriceById.get(b.id) ?? 0;

                        return (
                            <a
                                key={b.id}
                                href={`/detail/${b.slug ?? b.id}`}
                                className="group flex flex-col items-center text-center"
                            >
                                {/* Cover */}
                                <div className="w-full max-w-[260px]">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                                        <img
                                            src={b.coverImageUrl}
                                            alt={b.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Badge dưới ảnh */}
                                    <div className="mt-4">
                                        <span className="text-xs font-semibold tracking-[0.25em]">NEW</span>
                                    </div>

                                    {/* Title / Subtitle */}
                                    <div className="mt-3">
                                        <div className="font-serif text-base font-semibold leading-snug">
                                            {b.title}
                                        </div>
                                        {/* nếu có subtitle/author thì thay vào đây */}
                                        <div className="mt-1 text-sm text-zinc-500">{""}</div>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-6 text-sm tracking-wide text-zinc-700">
                                        US$ {price.toLocaleString()}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {!mutationHome.isPending && newAndTrending.length === 0 && (
                    <div className="mt-12 rounded border border-dashed p-8 text-center text-sm text-zinc-500">
                        No new arrivals yet.
                    </div>
                )}
            </div>
        </section>
    );

}
