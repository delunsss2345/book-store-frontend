"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileDown, Minus, Plus, Upload, X } from "lucide-react";
import * as React from "react";

type CartItem = {
    id: string;
    title: string;
    subtitle?: string;
    edition?: string;
    availability?: "In Stock" | "Out of Stock";
    price: number;
    imageUrl: string;
};

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

export default function ShoppingCartPage() {
    const [item, setItem] = React.useState<CartItem | null>({
        id: "1",
        title: "Sophia by Eisenstaedt",
        edition: "English",
        availability: "In Stock",
        price: 1000,
        imageUrl:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=240&q=60",
    });
    const [qty, setQty] = React.useState(1);

    const subtotal = item ? item.price * qty : 0;
    const total = subtotal;
    const itemCount = item ? 1 : 0;

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-semibold tracking-tight">Your Shopping Cart</h1>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
                {/* Left: cart table */}
                <Card className="rounded-2xl">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60%]">Title</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-center">Qty.</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {item ? (
                                    <TableRow className="align-top">
                                        <TableCell className="py-6">
                                            <div className="flex items-start gap-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="mt-10 rounded-full"
                                                    aria-label="Remove item"
                                                    onClick={() => setItem(null)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>

                                                <div className="h-28 w-20 overflow-hidden rounded-md border bg-muted">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="font-medium">{item.title}</div>
                                                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                        {item.edition ? (
                                                            <div>
                                                                <span className="text-foreground/70">Edition:</span> {item.edition}
                                                            </div>
                                                        ) : null}
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-foreground/70">Availability:</span>
                                                            <Badge
                                                                variant={
                                                                    item.availability === "In Stock" ? "secondary" : "destructive"
                                                                }
                                                                className="rounded-full"
                                                            >
                                                                {item.availability}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-6 text-right font-medium">
                                            {currency.format(item.price)}
                                        </TableCell>

                                        <TableCell className="py-6">
                                            <div className="mx-auto flex w-fit items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-full"
                                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>

                                                <div className="min-w-[42px] rounded-md border px-3 py-2 text-center text-sm">
                                                    {qty}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-full"
                                                    onClick={() => setQty((q) => q + 1)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-6 text-right font-medium">
                                            {currency.format(item.price * qty)}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                                            Your cart is empty.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* Footer row like the screenshot */}
                                <TableRow>
                                    <TableCell colSpan={2} className="py-5" />
                                    <TableCell className="py-5 text-center text-sm font-medium">
                                        {itemCount} Item{itemCount === 1 ? "" : "s"}
                                    </TableCell>
                                    <TableCell className="py-5 text-right text-sm font-medium">
                                        {currency.format(total)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Right: summary */}
                <div className="space-y-6">
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-base">Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">{currency.format(subtotal)}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Total</span>
                                    <span className="font-medium">{currency.format(total)}</span>
                                </div>
                            </div>

                            <Button className="w-full rounded-xl" size="lg" disabled={!item}>
                                Proceed to checkout
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-base">Cart Upload from spreadsheet</CardTitle>
                            <CardDescription>
                                Upload your order list to automatically populate your cart. Please use our template to
                                ensure correct formatting (semicolon-separated). You can use either the EAN or ISBN.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 sm:flex-row">
                            <Button variant="outline" className="w-full rounded-xl sm:w-auto">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload File
                            </Button>
                            <Button variant="link" className="justify-start px-0 sm:px-2">
                                <FileDown className="mr-2 h-4 w-4" />
                                Use our template
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Shipping conditions */}
            <div className="mt-12">
                <h2 className="text-lg font-semibold">Shipping Conditions</h2>
                <div className="mt-4 rounded-2xl border bg-card p-6">
                    <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        <li>
                            For a complete shipping summary, <span className="underline">click here</span>.
                        </li>
                        <li>
                            Ensure your <span className="font-medium text-foreground">billing and shipping information is correct</span> before completing checkout.
                        </li>
                        <li>
                            Review your order carefully before submitting, as orders <span className="font-medium text-foreground">cannot be edited or cancelled</span> once placed.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Discount codes are not valid</span> during sale periods.
                        </li>
                        <li>
                            Due to high order volumes during our sale, <span className="font-medium text-foreground">shipping delays may occur</span>.
                        </li>
                        <li>
                            You will receive a shipment confirmation email with tracking details within <span className="font-medium text-foreground">10–12 business days</span> once your order has been dispatched.
                        </li>
                    </ul>

                    <div className="mt-6">
                        <Button variant="outline" className="rounded-xl">
                            Shipping to the United States and Canada
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
