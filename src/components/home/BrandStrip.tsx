"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

const brands = ["Apple", "Samsung", "JBL", "Sony", "Beats", "VIZIO", "HP", "ASUS", "Razer", "Google", "Roku", "Logitech"];

export function BrandStrip() {
  const { t } = useLocale();

  return (
    <section>
      <h2 className="mb-4 text-headline-md font-headline-md text-on-background">{t("home.featuredBrands")}</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex h-20 items-center justify-center rounded-sm border border-surface-gray bg-surface-container-lowest px-3 text-center text-body-md font-bold text-on-surface-variant transition-shadow hover:shadow-md"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
