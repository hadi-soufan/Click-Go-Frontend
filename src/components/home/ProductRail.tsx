"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { ProductCard } from "@/components/ProductCard";

export function ProductRail({
  titleKey,
  subtitleKey,
  products,
  viewAllHref = "/products",
}: {
  titleKey: string;
  subtitleKey?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  const { t } = useLocale();

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-background">{t(titleKey)}</h2>
          {subtitleKey && <p className="text-body-sm text-on-surface-variant">{t(subtitleKey)}</p>}
        </div>
        <Link href={viewAllHref} className="shrink-0 text-body-sm font-semibold text-primary hover:underline">
          {t("home.viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
