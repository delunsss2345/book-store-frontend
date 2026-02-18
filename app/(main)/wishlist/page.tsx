"use client";

import Link from "next/link";

import BookCard from "@/app/(main)/_components/BookCard";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useWishlistMutation } from "@/features/wish/hooks";
import { useWishStore } from "@/features/wish/store/wish.store";

const WishlistPage = () => {
const { mutateAsync } = useWishlistMutation();
  const wishlist = useWishStore((state) => state.wish);
  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);
  return (
    <div className="container-main w-full py-8 min-h-[50vh]">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Your Wishlist</h1>
        <Button variant="outline" className="h-10 rounded-sm px-4 text-base">
          Add all to cart
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist &&  wishlist.items.map((item) => (
          <BookCard
            key={item.id}
            title={item.variant.book.translations[0].title}
            subtitle={item.variant.book.translations[0].description}
            price={item.variant.price as unknown as number}
            bookVariantId={item.variant.id}
            imageUrl={item.variant.book.coverImageUrl}
            href={`/detail/${item.variant.book.id}`}
          />
        ))}
        {wishlist?.items.length === 0 && <p className="mt-4 text-base">
          Your wishlist is empty.
      </p>}
        
      </div>
    </div>
  );
};

export default WishlistPage;
