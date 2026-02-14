"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export default function VerifyPage() {
    const params = useSearchParams();
    const router = useRouter();
    const email = params.get("email") ?? "";

    const [code, setCode] = React.useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: gọi verify API ở đây
        router.push("/");
    };

    return (
        <div>
            <h1 className="text-[21px] font-semibold tracking-tight text-neutral-900">Enter code</h1>
            <p className="mt-2 text-[16px] text-neutral-600">
                Sent to <span className="text-neutral-900">{email || "your email"}</span>
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit code"
                    inputMode="numeric"
                    className="h-16 w-full rounded-xl border-2 border-black px-4 text-[16px] outline-none"
                />

                <button
                    type="submit"
                    className="h-14 w-full rounded-xl bg-black text-[16px] font-semibold text-white hover:bg-neutral-900"
                >
                    Submit
                </button>
            </form>

            <Link
                href="/login"
                className="mt-6 inline-block text-[16px] text-neutral-900 underline underline-offset-4"
            >
                Sign in with a different email
            </Link>
        </div>
    );
}
