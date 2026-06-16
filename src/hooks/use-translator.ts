"use client";

import { useTranslations } from "next-intl";

const useTranslator = () => {
  const t = useTranslations();
  return { t };
};

export default useTranslator;
