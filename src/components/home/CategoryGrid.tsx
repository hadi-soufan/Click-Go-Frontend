"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { categories } from "@/data/categories";
import { localize } from "@/lib/utils";

export function CategoryGrid() {
  const { locale, t } = useLocale();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-headline-md font-headline-md text-on-background">{t("home.shopByCategory")}</h2>
        <Link href="/products" className="text-body-sm font-semibold text-primary hover:underline">
          {t("home.viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-2 rounded-sm border border-transparent p-3 text-center transition-colors hover:border-surface-variant hover:bg-surface-container-lowest"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container transition-colors group-hover:bg-primary-fixed">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.75} />
              </div>
              <span className="text-body-sm font-medium text-on-surface">{localize(category.name, locale)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
