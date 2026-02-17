"use client";

import { useHomeMutation } from "@/features/catalog/hooks/use-home.mutation";
import { selectorHome } from "@/features/catalog/selector/catalog.selector";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { PricedBook } from "@/types/response/catalog.response";
import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";
import BookCard from "../BookCard";

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
    const home = useCatalogStore(selectorHome);

    const getHome = useCallback(async () => {
        return mutationHome.mutateAsync();
    }, [mutationHome]);

    useEffect(() => {
        if (home) return;
        getHome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newAndTrending = useMemo(() => home?.newAndTrending ?? [], [home]);

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

                        return <BookCard
                            key={b.id}
                            title={b.title}
                            subtitle={b.title}
                            price={b.price}
                            currency="US$"
                            imageUrl={b.coverImageUrl}
                            href={`/detail/${b.slug ?? b.id}`}
                            bookVariantId={b.bookVariantId}
                        />
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
