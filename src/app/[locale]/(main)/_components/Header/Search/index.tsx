"use client";

import useTranslator from "@/hooks/use-translator";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchBar = () => {
  const { t } = useTranslator();
  const [text, setText] = useState("");
  const router = useRouter();
  const locale = useLocale();
  const handleSubmit = () => {
    const q = text.trim();
    if (!q) return;

    router.push(`/${locale}/books?keyword=${q}`);
  };

  return (
    <div className="relative hidden w-64 items-center md:flex">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="h-9 rounded-full border-line bg-surface px-4 pr-10 text-[13px] text-ink placeholder:text-ink-3 focus-visible:ring-1 focus-visible:ring-ink/20"
        placeholder={t("header.searchPlaceholder")}
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="absolute right-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink transition hover:bg-paper"
        aria-label={t("header.aria.searchButton")}
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBar;
