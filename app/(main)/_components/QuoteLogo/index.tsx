"use client";

import useTranslator from "@/hooks/use-translator";

const QuoteLogo = () => {
  const { t } = useTranslator();

  return (
    <div className="container-main w-full">
      <div className="py-10">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {t("footer.tagline")}
        </h2>
        <p className="mt-4 max-w-[var(--width-md)] text-sm leading-6 text-zinc-700">
          {t("footer.description")}
        </p>
      </div>
    </div>
  );
};

export default QuoteLogo;
