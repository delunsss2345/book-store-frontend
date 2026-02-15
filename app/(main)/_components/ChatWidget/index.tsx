"use client";

import * as React from "react";
import { MessageCircle, Minus, X, Send, MessageSquareOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ChatView = "closed" | "welcome" | "chat" | "end-confirm";

/* ------------------------------------------------------------------ */
/*  Chat Widget (UI only – no real messaging logic)                   */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
    const [view, setView] = React.useState<ChatView>("closed");

    /* ---- Floating bubble ---- */
    if (view === "closed") {
        return (
            <button
                type="button"
                onClick={() => setView("welcome")}
                className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition hover:scale-105 hover:bg-neutral-800"
                aria-label="Open chat"
            >
                <MessageCircle className="h-6 w-6" />
            </button>
        );
    }

    return (
        <div className="fixed right-6 bottom-6 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
            {/* ======================================================== */}
            {/*  HEADER (shared across welcome / chat / end-confirm)      */}
            {/* ======================================================== */}
            {view !== "end-confirm" && (
                <div className="flex items-center gap-3 bg-neutral-900 px-5 py-4 text-white">
                    {/* Logo */}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-lg font-bold">
                        B
                    </span>

                    {view === "chat" && (
                        <span className="text-sm font-medium tracking-wide">
                            Chat with us
                        </span>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                        {view === "chat" && (
                            <button
                                type="button"
                                onClick={() => setView("closed")}
                                className="rounded p-1 transition hover:bg-white/20"
                                aria-label="Minimize"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() =>
                                view === "chat" ? setView("end-confirm") : setView("closed")
                            }
                            className="rounded p-1 transition hover:bg-white/20"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/*  VIEW: Welcome (name + email form)                        */}
            {/* ======================================================== */}
            {view === "welcome" && (
                <div className="flex flex-1 flex-col px-6 py-8">
                    <h2 className="text-2xl font-bold text-neutral-900">Welcome!</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Thank you for using our Virtual Assistant.
                    </p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <label className="mb-1.5 block text-xs text-neutral-500">
                                Enter your name
                            </label>
                            <Input
                                placeholder="Your name"
                                className="h-11 rounded-lg border-neutral-300 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs text-neutral-500">
                                Enter your email
                            </label>
                            <Input
                                placeholder="your@email.com"
                                type="email"
                                className="h-11 rounded-lg border-neutral-300 text-sm"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => setView("chat")}
                        className="mt-8 h-12 w-full rounded-full bg-neutral-900 text-sm font-semibold tracking-wide text-white hover:bg-neutral-800"
                    >
                        Start Chat
                        <Send className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="mt-4 text-center text-[11px] text-neutral-400">
                        Just to let you know, by talking with us today, you are accepting our
                        Privacy Policy.
                    </p>
                </div>
            )}

            {/* ======================================================== */}
            {/*  VIEW: Chat window                                        */}
            {/* ======================================================== */}
            {view === "chat" && (
                <>
                    {/* Messages area */}
                    <div className="flex-1 space-y-4 overflow-y-auto bg-neutral-50 p-5" style={{ minHeight: 360 }}>
                        {/* Bot message */}
                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                                    B
                                </span>
                                <span className="text-sm font-semibold text-neutral-800">
                                    BookStore Assistant
                                </span>
                                <span className="text-xs text-neutral-400">• AI Agent</span>
                            </div>
                            <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
                                <p>Hello!</p>
                                <p>
                                    I&apos;m BookStore&apos;s virtual assistant and I can help with
                                    a variety of inquiries including order tracking and general
                                    questions.
                                </p>
                                <p>How can I help you?</p>
                            </div>
                        </div>
                    </div>

                    {/* Input bar */}
                    <div className="flex items-center gap-2 border-t border-neutral-200 px-4 py-3">
                        <Input
                            placeholder="Type message here"
                            className="h-10 flex-1 rounded-full border-neutral-300 px-4 text-sm"
                        />
                        <button
                            type="button"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 transition hover:bg-neutral-300"
                            aria-label="Send message"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-1 border-t border-neutral-100 py-2 text-[11px] text-neutral-400">
                        <span>⚡</span> by BookStore
                    </div>
                </>
            )}

            {/* ======================================================== */}
            {/*  VIEW: End chat confirmation                              */}
            {/* ======================================================== */}
            {view === "end-confirm" && (
                <>
                    {/* Header for end-confirm */}
                    <div className="flex items-center gap-3 bg-neutral-900 px-5 py-4 text-white">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-lg font-bold">
                            B
                        </span>
                        <span className="text-sm font-medium tracking-wide">
                            Chat with us
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setView("chat")}
                                className="rounded p-1 transition hover:bg-white/20"
                                aria-label="Minimize"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setView("closed")}
                                className="rounded p-1 transition hover:bg-white/20"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Dimmed chat behind */}
                    <div className="space-y-4 bg-neutral-100/80 p-5" style={{ minHeight: 200 }}>
                        <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                                    B
                                </span>
                                <span className="text-sm font-semibold text-neutral-800">
                                    BookStore Assistant
                                </span>
                                <span className="text-xs text-neutral-400">• AI Agent</span>
                            </div>
                            <div className="space-y-2 text-sm leading-relaxed text-neutral-500">
                                <p>Hello!</p>
                                <p>
                                    I&apos;m BookStore&apos;s virtual assistant and I can help with
                                    a variety of inquiries.
                                </p>
                                <p>How can I help you?</p>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation card */}
                    <div className="border-t border-neutral-200 bg-white px-8 py-8 text-center">
                        <MessageSquareOff className="mx-auto h-10 w-10 text-neutral-700" />
                        <h3 className="mt-3 text-lg font-bold text-neutral-900">
                            End Chat
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                            Are you sure you want to end this chat?
                        </p>

                        <div className="mt-6 space-y-3">
                            <Button
                                onClick={() => setView("closed")}
                                variant="outline"
                                className="h-11 w-full rounded-full border-red-200 bg-red-50 text-sm font-semibold text-red-500 hover:bg-red-100"
                            >
                                End chat
                            </Button>
                            <Button
                                onClick={() => setView("chat")}
                                variant="outline"
                                className="h-11 w-full rounded-full border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-1 border-t border-neutral-100 py-2 text-[11px] text-neutral-400">
                        <span>⚡</span> by BookStore
                    </div>
                </>
            )}
        </div>
    );
}
