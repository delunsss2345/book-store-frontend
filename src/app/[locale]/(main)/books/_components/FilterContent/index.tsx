"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { languages, priceRanges, sortOptions, themes } from "../filter.data";

import useTranslator from "@/hooks/use-translator";

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
  const { t } = useTranslator();
  
  return (
    <aside className="hidden border-r border-line bg-surface px-6 py-8 lg:block">
      <div className="flex items-center justify-between">
        <h3 className="display text-[18px] font-semibold">{t("catalog.sortAndFilter")}</h3>
        <SlidersHorizontal className="h-4 w-4 text-ink-3" />
      </div>

      <div className="mt-6">
        <p className="text-[12px] font-bold uppercase tracking-wider text-ink">
          {t("catalog.sortBy")}
        </p>
        <div className="relative mt-2">
          <button
            className="flex w-full items-center justify-between rounded-lg border border-line bg-paper px-3 py-2.5 text-[13px]"
            onClick={() => setSortOpen(!sortOpen)}
          >
            <span>{selectedSort}</span>
            <ChevronDown className="h-4 w-4 text-ink-3" />
          </button>
          {sortOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-line bg-white shadow-lg overflow-hidden">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  className={`block w-full px-3 py-2 text-left text-[13px] hover:bg-paper ${
                    opt === selectedSort ? "font-bold text-ink" : "text-ink-2"
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

      <div className="my-6 h-px w-full bg-line" />

      {/* Themes */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-ink">
          {t("catalog.themes")}
        </p>
        <div className="mt-3 space-y-2.5 text-[13px] text-ink-2">
          {themes.map((t) => (
            <label
              key={t.label}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-ink"
              />
              <span>
                {t.label} <span className="text-ink-3">({t.count})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="my-6 h-px w-full bg-line" />

      {/* Price */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-ink">
          {t("catalog.price")}
        </p>
        <div className="mt-3 space-y-2.5 text-[13px] text-ink-2">
          {priceRanges.map((p) => (
            <label
              key={p}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === p}
                onChange={() => setSelectedPrice(p)}
                className="h-4 w-4 accent-ink"
              />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="my-6 h-px w-full bg-line" />

      {/* Height */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold uppercase tracking-wider text-ink">
            {t("catalog.height")}
          </p>
          <span className="text-[11px] text-ink-3">13 – 70 cm</span>
        </div>
        <input
          type="range"
          min="13"
          max="70"
          defaultValue="70"
          className="mt-2 w-full accent-ink"
        />
      </div>

      <button className="btn-outline mt-7 h-11 w-full rounded-none text-[11px] font-bold uppercase tracking-[0.15em]">
        {t("catalog.applyFilters")}
      </button>
    </aside>
  );
}
