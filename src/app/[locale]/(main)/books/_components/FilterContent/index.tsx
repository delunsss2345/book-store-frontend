"use client";

import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { languages, priceRanges, sortOptions, themes } from "../filter.data";

export function FilterContent({
  sortOpen,
  setSortOpen,
  selectedSort,
  setSelectedSort,
  selectedPrice,
  setSelectedPrice,
}: {
  sortOpen: boolean;
  setSortOpen: (v: boolean) => void;
  selectedSort: string;
  setSelectedSort: (v: string) => void;
  selectedPrice: string;
  setSelectedPrice: (v: string) => void;
}) {
  return (
    <div className="space-y-6 px-6 py-5">
      {/* Sort by */}
      <div>
        <h3 className="text-sm font-bold">Sort by</h3>
        <div className="relative mt-2">
          <button
            className="flex w-[200px] items-center justify-between border px-3 py-2 text-sm"
            onClick={() => setSortOpen(!sortOpen)}
          >
            <span>{selectedSort}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {sortOpen && (
            <div className="absolute left-0 top-full z-10 w-[200px] border bg-white shadow-md">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  className={`block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 ${opt === selectedSort ? "font-bold" : ""
                    }`}
                  onClick={() => {
                    setSelectedSort(opt);
                    setSortOpen(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Themes */}
      <div>
        <h3 className="text-sm font-bold">Themes</h3>
        <div className="mt-3 space-y-2.5">
          {themes.map((t) => (
            <label
              key={t.label}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
              />
              <span>
                {t.label} <span className="text-zinc-400">({t.count})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <h3 className="text-sm font-bold">Price</h3>
        <div className="mt-3 space-y-2.5">
          {priceRanges.map((p) => (
            <label
              key={p}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === p}
                onChange={() => setSelectedPrice(p)}
                className="h-4 w-4 border-zinc-300"
              />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Width */}
      <div>
        <h3 className="text-sm font-bold">Width</h3>
        <p className="mt-2 text-right text-xs text-zinc-500">10 cm - 70 cm</p>
        <input
          type="range"
          min={10}
          max={70}
          defaultValue={70}
          className="mt-1 w-full accent-zinc-900"
        />
      </div>

      <Separator />

      {/* Height */}
      <div>
        <h3 className="text-sm font-bold">Height</h3>
        <p className="mt-2 text-right text-xs text-zinc-500">13 cm - 70 cm</p>
        <input
          type="range"
          min={13}
          max={70}
          defaultValue={70}
          className="mt-1 w-full accent-zinc-900"
        />
      </div>

      <Separator />

      {/* Language */}
      <div>
        <h3 className="text-sm font-bold">Language</h3>
        <div className="mt-3 space-y-2.5">
          {languages.map((l) => (
            <label
              key={l.label}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
              />
              <span>
                {l.label} <span className="text-zinc-400">({l.count})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <div className="pb-4 pt-2">
        <Button
          variant="outline"
          className="w-full rounded-none border-zinc-900 text-xs uppercase tracking-wider"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
