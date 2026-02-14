"use client";

import * as React from "react";

export type LoginValues = { email: string };

export default function AuthenticationForm({
    isLoading,
    onSubmit,
}: {
    isLoading: boolean;
    onSubmit: (values: LoginValues) => void | Promise<void>;
}) {
    const [email, setEmail] = React.useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ email });
            }}
            className="space-y-5"
        >
            <div className="space-y-2">
                <label className="text-[16px] text-neutral-600">Email</label>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="h-14 w-full rounded-xl border border-neutral-200 px-4 text-[16px] outline-none focus:border-neutral-400"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-xl bg-black text-[18px] font-semibold text-white hover:bg-neutral-900 disabled:opacity-60"
            >
                Continue
            </button>
        </form>
    );
}
