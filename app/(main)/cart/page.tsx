"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartMutation } from "@/features/cart/hooks";
import { selectorCart } from "@/features/cart/selector/cart.selector";
import { useCartStore } from "@/features/cart/store/cart.store";
import { Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type CartItem = {
    id: string;
    title: string;
    subtitle?: string;
    edition?: string;
    availability?: string;
    price: number;
    qty: number;
    imageUrl: string;
};

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});


export default function ShoppingCartPage() {
    const router = useRouter();
    const cart = useCartStore(selectorCart);
    const mutationCart = useCartMutation();
    useEffect(() => {
        mutationCart.mutateAsync()
    }, [])
    const updateQty = (id: string, delta: number) => {
        // setItems((prev) =>
        //     prev.map((item) =>
        //         item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        //     )
        // );
    };

    const removeItem = (id: string) => {
        // setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // const totalItems = cart?.items.reduce((sum, item) => sum + item.qty, 0);
    // const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    // const total = subtotal;

    return (
        <div className="container-main w-full py-10">
            <h1 className="text-lg font-bold tracking-tight">Your Shopping Cart</h1>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
                <div>
                    <div className="grid grid-cols-[1fr_140px_100px_100px] items-center border-b pb-3 text-xs text-zinc-500">
                        <span>Title</span>
                        <span className="text-center">Price</span>
                        <span className="text-center">Qty.</span>
                        <span className="text-right">Total</span>
                    </div>

                    {cart && cart.items.length > 0 ? (
                        cart.items.map((item) => (
                            <div key={item.bookVariantId}>
                                <div className="grid grid-cols-[1fr_140px_100px_100px] items-start gap-x-4 py-6">
                                    {/* Title column */}
                                    <div className="flex items-start gap-3">
                                        <button
                                            type="button"
                                            className="mt-8 shrink-0 text-zinc-400 transition-colors hover:text-zinc-900"
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        <div className="h-[120px] w-[80px] shrink-0 overflow-hidden border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 space-y-1">
                                            <p className="text-sm font-medium leading-snug">
                                                {item.title}
                                            </p>
                                            {item.edition && (
                                                <p className="text-xs text-zinc-500">
                                                    <span className="text-zinc-700">Edition:</span>{" "}
                                                    <span className="text-blue-600">{item.edition}</span>
                                                </p>
                                            )}
                                            {item.availability && (
                                                <p className="text-xs text-zinc-500">
                                                    Availability:{" "}
                                                    <span className="text-zinc-700">
                                                        {item.availability}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="pt-1 text-center text-sm">
                                        US{currency.format(item.price)}
                                    </div>

                                    {/* Qty */}
                                    <div className="flex items-center justify-center gap-1 pt-1">
                                        <button
                                            type="button"
                                            className="flex h-7 w-7 items-center justify-center border text-zinc-500 transition-colors hover:text-zinc-900"
                                            onClick={() => updateQty(item.id, -1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <div className="flex h-7 w-8 items-center justify-center border text-xs">
                                            {item.qty}
                                        </div>
                                        <button
                                            type="button"
                                            className="flex h-7 w-7 items-center justify-center border text-zinc-500 transition-colors hover:text-zinc-900"
                                            onClick={() => updateQty(item.id, 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="pt-1 text-right text-sm">
                                        US{currency.format(item.price * item.qty)}
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center text-sm text-zinc-400">
                            Your cart is empty.
                        </div>
                    )}

                    {/* Footer totals row */}
                    {cart && cart.items.length > 0 && (
                        <div className="grid grid-cols-[1fr_140px_100px_100px] items-center py-4 text-sm font-semibold">
                            <span />
                            <span />
                            <span className="text-center">
                                {/* {totalItems} Item{totalItems !== 1 ? "s" : ""} */}
                            </span>
                            <span className="text-right">
                                {/* US{currency.format(total)} */}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold">Summary</h2>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-600">Subtotal</span>
                                {/* <span>US{currency.format(subtotal)}</span> */}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between font-medium">
                                <span>Total</span>
                                {/* <span>US{currency.format(total)}</span> */}
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push("/checkout")}
                            variant="outline"
                            className="mt-5 w-full cursor-pointer rounded-none border-zinc-900 py-5 text-xs uppercase tracking-wider"
                            disabled={cart?.items && cart.items.length === 0}
                        >
                            Proceed to checkout
                        </Button>
                    </div>

                    <Separator />
                </div>
            </div>
        </div>
    );
}
