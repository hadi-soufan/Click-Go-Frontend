"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, Heart, ShoppingCart, User, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { categories } from "@/data/categories";
import { localize } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";

export function Header() {
  const { locale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col bg-primary shadow-md dark:bg-deep-navy">
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between gap-gutter px-margin-mobile py-stack-sm md:px-margin-desktop">
        <div className="flex flex-1 items-center gap-stack-md">
          <button
            type="button"
            className="rounded-lg p-2 text-primary-fixed md:hidden"
            aria-label={t("header.menu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link href="/" className="shrink-0 text-headline-lg font-headline-lg font-black tracking-tight text-secondary-fixed-dim">
            {t("brand")}
          </Link>
          <div className="relative ms-stack-md hidden max-w-2xl flex-1 items-center md:flex">
            <input
              type="text"
              placeholder={t("header.searchPlaceholder")}
              className="h-12 w-full rounded-full border border-outline-variant bg-surface-container-lowest ps-4 pe-12 text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              aria-label={t("common.search")}
              className="absolute end-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-fixed-dim transition-colors hover:bg-secondary-fixed"
            >
              <Search className="h-4 w-4 text-on-secondary-fixed" />
            </button>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-primary-fixed">
          <ThemeToggle />
          <LocaleToggle className="hidden rounded-full px-3 py-2 text-label-bold font-label-bold text-primary-fixed transition-colors hover:bg-on-primary-fixed-variant md:block" />
          <Link href="#" className="hidden flex-col items-center rounded-lg p-2 transition-colors hover:bg-on-primary-fixed-variant md:flex" aria-label={t("header.wishlist")}>
            <Heart className="h-5 w-5" />
            <span className="hidden text-label-bold font-label-bold lg:block">{t("header.wishlist")}</span>
          </Link>
          <Link href="#" className="hidden flex-col items-center rounded-lg p-2 transition-colors hover:bg-on-primary-fixed-variant md:flex" aria-label={t("header.account")}>
            <User className="h-5 w-5" />
            <span className="hidden text-label-bold font-label-bold lg:block">{t("header.account")}</span>
          </Link>
          <Link href="/cart" className="relative flex flex-col items-center rounded-lg p-2 transition-colors hover:bg-on-primary-fixed-variant" aria-label={t("header.cart")}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-fixed-dim text-[10px] font-bold text-on-secondary-fixed">
                {totalItems}
              </span>
            )}
            <span className="hidden text-label-bold font-label-bold lg:block">{t("header.cart")}</span>
          </Link>
        </div>
      </div>

      {/* mobile search */}
      <div className="px-margin-mobile pb-3 md:hidden">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={t("header.searchPlaceholder")}
            className="h-11 w-full rounded-full border border-outline-variant bg-surface-container-lowest ps-4 pe-11 text-body-sm text-on-surface outline-none"
          />
          <Search className="absolute end-3 h-4 w-4 text-primary" />
        </div>
      </div>

      <nav className="hidden border-t border-primary-fixed-dim/20 bg-primary dark:bg-deep-navy md:flex">
        <div className="mx-auto flex w-full max-w-container-max items-center gap-stack-md overflow-x-auto px-margin-desktop py-2">
          <Link href="/products" className="whitespace-nowrap px-3 py-1 text-label-bold font-label-bold text-primary-fixed-dim hover:text-on-primary">
            {t("nav.allProducts")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="whitespace-nowrap px-3 py-1 text-label-bold font-label-bold text-primary-fixed-dim hover:text-primary-fixed"
            >
              {localize(category.name, locale)}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-primary-fixed-dim/20 bg-primary px-margin-mobile py-3 dark:bg-deep-navy md:hidden">
          <Link href="/products" className="rounded-lg px-3 py-2 text-label-bold font-label-bold text-primary-fixed hover:bg-on-primary-fixed-variant" onClick={() => setMenuOpen(false)}>
            {t("nav.allProducts")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="rounded-lg px-3 py-2 text-label-bold font-label-bold text-primary-fixed-dim hover:bg-on-primary-fixed-variant hover:text-primary-fixed"
              onClick={() => setMenuOpen(false)}
            >
              {localize(category.name, locale)}
            </Link>
          ))}
          <Link href="/cart" className="rounded-lg px-3 py-2 text-label-bold font-label-bold text-primary-fixed-dim hover:bg-on-primary-fixed-variant hover:text-primary-fixed" onClick={() => setMenuOpen(false)}>
            {t("header.cart")}
          </Link>
          <div className="mt-2 flex items-center justify-between px-3">
            <LocaleToggle className="rounded-full bg-on-primary-fixed-variant px-3 py-2 text-label-bold font-label-bold text-primary-fixed" />
          </div>
        </nav>
      )}
    </header>
  );
}
