"use client";

import { ChevronRight, RotateCw, Unplug } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-ink antialiased">
        <div className="grid min-h-[100vh] place-items-center bg-paper p-6">
          <div className="flex flex-col items-center gap-5 px-10 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft">
              <Unplug className="text-[26px] text-accent" />
            </span>
            
            <h3 className="display text-[26px] font-semibold text-ink">
              Something broke on our end
            </h3>
            
            <p className="max-w-md text-[14px] leading-relaxed text-ink-2">
              An unexpected error interrupted this view. Your cart and account are safe. You can retry the action or head back home.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2.5">
              <button 
                onClick={() => reset()}
                className="btn-ink inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px]"
              >
                <RotateCw className="h-4 w-4" /> Try again
              </button>
              <a 
                href="/dashboard/overview"
                className="btn-soft inline-flex items-center rounded-full px-5 py-2.5 text-[13px]"
              >
                Go home
              </a>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-2 w-full max-w-md text-left">
                <summary className="flex cursor-pointer items-center gap-1.5 text-[12px] font-semibold text-ink-3">
                  <ChevronRight className="h-3.5 w-3.5" /> Technical details (dev only)
                </summary>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-surface p-4 text-[11.5px] border border-line text-ink-2">
                  <span className="text-ink-3">// digest surfaced to the user, full stack logged server-side{"\n"}</span>
                  Error digest: <span className="font-semibold text-ink">{error.digest || "N/A"}</span>{"\n"}
                  {error.message}{"\n"}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
