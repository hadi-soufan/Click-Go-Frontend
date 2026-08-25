"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { localize } from "@/lib/utils";
import type { CategoryId } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "bestMatch" | "priceLowHigh" | "priceHighLow" | "topRated";

const priceRanges = [
  { key: "priceUnder", test: (price: number) => price < 50 },
  { key: "price50to200", test: (price: number) => price >= 50 && price < 200 },
  { key: "price200to500", test: (price: number) => price >= 200 && price < 500 },
  { key: "price500to1000", test: (price: number) => price >= 500 && price < 1000 },
  { key: "priceOver", test: (price: number) => price >= 1000 },
];

export function ProductsView() {
  const { locale, t } = useLocale();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") as CategoryId | null;

  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("bestMatch");

  // Re-syncs the category filter when navigating between category links while mounted;
  // initial render already matches via the lazy useState above.
  const searchParamsKey = searchParams.toString();
  useEffect(() => {
    const category = searchParams.get("category") as CategoryId | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategories(category ? [category] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsKey]);

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
      if (selectedRanges.length) {
        const matchesRange = selectedRanges.some((key) => priceRanges.find((r) => r.key === key)?.test(product.price));
        if (!matchesRange) return false;
      }
      if (minRating && product.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "priceLowHigh":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "topRated":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [selectedCategories, selectedBrands, selectedRanges, minRating, sort]);

  const toggle = <T,>(value: T, list: T[], setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRanges([]);
    setMinRating(0);
  };

  const pageTitle =
    selectedCategories.length === 1
      ? localize(categories.find((c) => c.id === selectedCategories[0])!.name, locale)
      : t("nav.allProducts");

  return (
    <div className="mx-auto flex w-full max-w-container-max items-start gap-gutter px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* Sidebar filters */}
      <aside className="sticky top-40 hidden w-72 shrink-0 flex-col rounded-sm border-e border-outline-variant bg-surface-container-lowest p-4 md:flex">
        <div className="mb-stack-md border-b border-surface-variant pb-4">
          <h2 className="text-headline-md font-headline-md text-primary">{t("filters.title")}</h2>
          <p className="text-body-sm text-on-surface-variant">{t("filters.narrow")}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-3 text-label-bold font-label-bold text-on-surface">{t("filters.category")}</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label key={category.id} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggle(category.id, selectedCategories, setSelectedCategories)}
                    className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-body-md text-on-surface-variant transition-colors group-hover:text-primary">
                    {localize(category.name, locale)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-label-bold font-label-bold text-on-surface">{t("filters.price")}</h3>
            <div className="flex flex-col gap-2">
              {priceRanges.map((range) => (
                <label key={range.key} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRanges.includes(range.key)}
                    onChange={() => toggle(range.key, selectedRanges, setSelectedRanges)}
                    className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-body-md text-on-surface-variant transition-colors group-hover:text-primary">
                    {t(`filters.${range.key}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-label-bold font-label-bold text-on-surface">{t("filters.brand")}</h3>
            <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pe-1">
              {brands.map((brand) => (
                <label key={brand} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggle(brand, selectedBrands, setSelectedBrands)}
                    className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-body-md text-on-surface-variant transition-colors group-hover:text-primary">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-label-bold font-label-bold text-on-surface">{t("filters.rating")}</h3>
            <div className="flex flex-col gap-2">
              {[4, 3, 2].map((r) => (
                <label key={r} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="h-4 w-4 border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-body-md text-on-surface-variant transition-colors group-hover:text-primary">{r}+</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-8 rounded-full bg-surface-container-high py-2 text-label-bold font-label-bold text-on-surface-variant transition-colors hover:bg-outline-variant"
        >
          {t("filters.clearFilters")}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
          <Link href="/" className="transition-colors hover:text-primary">
            {t("product.breadcrumbHome")}
          </Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="font-semibold text-on-surface">{pageTitle}</span>
        </nav>

        <div className="mb-stack-lg flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="mb-1 text-headline-xl-mobile font-headline-xl-mobile text-on-background md:text-headline-lg md:font-headline-lg">
              {pageTitle}
            </h1>
            <p className="text-body-md text-on-surface-variant">{t("filters.showingResults", { count: filtered.length })}</p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-body-sm text-on-surface-variant">
              {t("filters.sortBy")}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="cursor-pointer rounded-full border border-outline-variant bg-surface-container-lowest py-2 pe-8 ps-4 text-body-sm text-on-surface focus:border-primary focus:ring-primary"
            >
              <option value="bestMatch">{t("filters.bestMatch")}</option>
              <option value="priceLowHigh">{t("filters.priceLowHigh")}</option>
              <option value="priceHighLow">{t("filters.priceHighLow")}</option>
              <option value="topRated">{t("filters.topRated")}</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-sm border border-dashed border-outline-variant p-10 text-center text-body-md text-on-surface-variant">
            {t("filters.noResults")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
