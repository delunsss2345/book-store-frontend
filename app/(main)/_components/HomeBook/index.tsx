"use client";

import { useHomeQuery } from "@/features/catalog/hooks/use-home.mutation";
import { PricedBook } from "@/types/response/catalog.response";
import { useMemo } from "react";
import BookCard from "../BookCard";

export function HomeBook() {
    const { data: home, isPending, isError } = useHomeQuery();

    const newAndTrending = useMemo(() => home?.newAndTrending ?? [], [home]);

    return (
        <section className="container-main py-10">
            <div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-wide">New &amp; Trending</h2>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-16 md:grid-cols-3 lg:grid-cols-4 ">
                    {newAndTrending.map((b) => {
                        const book = b as PricedBook & { price: number; bookVariantId: number };

                        return <BookCard
                            key={b.id}
                            title={b.title}
                            subtitle={b.title}
                            price={book.price}
                            currency="US$"
                            imageUrl={b.coverImageUrl}
                            href={`/detail/${b.slug ?? b.id}`}
                            bookVariantId={book.bookVariantId}
                        />
                    })}
                </div>

                {isError && (
                    <div className="mt-12 rounded border border-dashed p-8 text-center text-sm text-zinc-500">
                        Failed to load books.
                    </div>
                )}

                {!isPending && !isError && newAndTrending.length === 0 && (
                    <div className="mt-12 rounded border border-dashed p-8 text-center text-sm text-zinc-500">
                        No new arrivals yet.
                    </div>
                )}
            </div>
        </section>
    );

}
