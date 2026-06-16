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
    <div className="relative hidden w-90 items-center md:flex">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="h-10 rounded-md pr-10 text-sm"
        placeholder={t("header.searchPlaceholder")}
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
        aria-label={t("header.aria.searchButton")}
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBar;
