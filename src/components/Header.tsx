"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Search, Menu, Heart, ShoppingCart, User, X, ChevronDown, Wallet, Wrench, Truck, Store } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { categories } from "@/data/categories";
import { getBrandsForCategory } from "@/data/products";
import { localize } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";

const serviceLinks = [
  { key: "whishMoney", icon: Wallet },
  { key: "repair", icon: Wrench },
  { key: "delivery", icon: Truck },
  { key: "onlineShop", icon: Store },
];

interface MenuPos {
  top: number;
  left?: number;
  right?: number;
}

export function Header() {
  const { locale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalItems = useCartStore((state) => state.totalItems());

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const openDropdown = (event: React.MouseEvent<HTMLElement>, id: string) => {
    cancelClose();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPos(
      locale === "ar" ? { top: rect.bottom, right: window.innerWidth - rect.right } : { top: rect.bottom, left: rect.left }
    );
    setOpenMenu(id);
  };

  const openCategory = openMenu && openMenu !== "services" ? categories.find((c) => c.id === openMenu) : null;
  const openCategoryBrands = openCategory ? getBrandsForCategory(openCategory.id) : [];

  return (
    <header className="sticky -top-px z-50 flex w-full flex-col bg-primary shadow-md dark:bg-deep-navy">
      <div className="mx-auto flex w-full max-w-full lg:max-w-container-max items-center justify-between gap-gutter px-margin-mobile py-stack-sm md:px-margin-desktop">
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
        <div className="mx-auto flex w-full max-w-full items-center gap-stack-md overflow-x-auto lg:max-w-container-max px-margin-desktop py-2 hide-scrollbar">
          {/* Services dropdown trigger */}
          <button
            type="button"
            onMouseEnter={(event) => openDropdown(event, "services")}
            onMouseLeave={scheduleClose}
            className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-label-bold font-label-bold transition-colors ${
              openMenu === "services" ? "bg-on-primary-fixed-variant text-primary-fixed" : "text-primary-fixed-dim"
            }`}
          >
            {t("nav.services")}
            <ChevronDown className="h-4 w-4" />
          </button>

          <Link href="/products" className="whitespace-nowrap rounded-full px-3 py-1 text-label-bold font-label-bold text-primary-fixed-dim hover:text-primary-fixed">
            {t("nav.allProducts")}
          </Link>

          {/* Category triggers */}
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              onMouseEnter={(event) => openDropdown(event, category.id)}
              onMouseLeave={scheduleClose}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-label-bold font-label-bold transition-colors ${
                openMenu === category.id ? "bg-on-primary-fixed-variant text-primary-fixed" : "text-primary-fixed-dim"
              }`}
            >
              {localize(category.name, locale)}
            </Link>
          ))}
        </div>
      </nav>

      {/* Fixed-position dropdown panels (escape the nav's horizontal scroll clipping) */}
      {openMenu === "services" && menuPos && (
        <div
          style={{ top: menuPos.top, left: menuPos.left, right: menuPos.right }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="fixed z-50 w-64 rounded-sm border border-outline-variant bg-surface-container-lowest py-2 shadow-elevated animate-fade-in"
        >
          <p className="px-4 py-2 text-label-bold font-label-bold text-on-surface">{t("nav.allServices")}</p>
          {serviceLinks.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.key}
                href="#"
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-3 px-4 py-2 text-body-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {t(`nav.${service.key}`)}
              </Link>
            );
          })}
        </div>
      )}

      {openCategory && openCategoryBrands.length > 0 && menuPos && (
        <div
          style={{ top: menuPos.top, left: menuPos.left, right: menuPos.right }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="fixed z-50 w-56 rounded-sm border border-outline-variant bg-surface-container-lowest py-2 shadow-elevated animate-fade-in"
        >
          <Link
            href={`/products?category=${openCategory.id}`}
            onClick={() => setOpenMenu(null)}
            className="block px-4 py-2 text-label-bold font-label-bold text-primary hover:underline"
          >
            {t("nav.shopAll")} {localize(openCategory.name, locale)}
          </Link>
          <div className="my-1 border-t border-surface-variant" />
          {openCategoryBrands.map((brand) => (
            <Link
              key={brand}
              href={`/products?category=${openCategory.id}&brand=${encodeURIComponent(brand)}`}
              onClick={() => setOpenMenu(null)}
              className="block px-4 py-2 text-body-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
            >
              {brand}
            </Link>
          ))}
        </div>
      )}

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
