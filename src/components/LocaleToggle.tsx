"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      aria-label="Toggle language"
      className={
        className ??
        "rounded-full px-3 py-2 text-label-bold font-label-bold text-primary-fixed transition-colors duration-200 hover:bg-on-primary-fixed-variant"
      }
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
