"use client";

import { Button } from "@/components/ui/button";
import { useWishlistQuery } from "@/features/wish/hooks";
import BookCard from "../_components/BookCard";

const WishlistPage = () => {
  const { data: wishlist, isPending, isError } = useWishlistQuery();

  if (isPending) {
    return (
      <div className="container-main w-full py-8 min-h-[50vh] text-sm text-zinc-500">
        Loading wishlist...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-main w-full py-8 min-h-[50vh] text-sm text-zinc-500">
        Failed to load wishlist.
      </div>
    );
  }

  return (
    <div className="container-main w-full py-8 min-h-[50vh]">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Your Wishlist</h1>
        <Button variant="outline" className="h-10 rounded-sm px-4 text-base">
          Add all to cart
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist &&
          wishlist.items.map((item) => (
            <BookCard
              key={item.id}
              title={item.variant.book.translations[0].title}
              subtitle={item.variant.book.translations[0].description ?? ""}
              price={0}
              bookVariantId={Number(item.variant.id)}
              imageUrl={item.variant.book?.coverImageUrl ?? ""}
              href={`/detail/${item.variant.book.id}`}
            />
          ))}
        {wishlist?.items.length === 0 && (
          <p className="mt-4 text-base">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
