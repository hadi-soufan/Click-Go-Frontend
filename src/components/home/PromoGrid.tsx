"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function PromoGrid() {
  const { t } = useLocale();

  return (
    <section className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
      {/* Large featured banner (square) — image is the full tile background */}
      <Link
        href="/products/macbook-neo-13"
        className="group relative flex min-h-72 flex-col overflow-hidden rounded-sm bg-primary-fixed"
      >
        <Image
          src="/images/products/macbook-neo-13.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 38vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="relative z-10 p-6">
          <p className="mb-1 text-body-sm font-semibold text-on-primary-fixed">{t("home.macbookBannerEyebrow")}</p>
          <h3 className="text-headline-lg font-headline-lg leading-tight text-on-primary-fixed">{t("home.macbookBannerTitle")}</h3>
          <span className="mt-3 inline-block rounded-full bg-on-primary-fixed px-4 py-2 text-body-sm font-bold text-primary-fixed transition-colors group-hover:opacity-90">
            {t("home.heroCta")}
          </span>
        </div>
      </Link>

      {/* Middle column: wide wearable-tech banner + 2 portrait tiles */}
      <div className="flex flex-col gap-4">
        <Link
          href="/products?category=accessories"
          className="group relative flex flex-1 min-h-40 flex-col overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm"
        >
          <Image
            src="/images/lifestyle/wearable-tech-college.avif"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 31vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative z-10 p-4">
            <p className="mb-1 text-body-sm font-semibold uppercase tracking-wider text-on-surface">{t("home.wearableBannerEyebrow")}</p>
            <h4 className="text-body-lg font-bold text-on-surface">{t("home.wearableBannerTitle")}</h4>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/products?category=accessories"
            className="group relative flex aspect-[100/137.35] flex-col overflow-hidden rounded-sm bg-deep-navy"
          >
            <Image
              src="/images/lifestyle/keyboard-mouse.avif"
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 15vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h4 className="relative z-10 p-4 text-body-md font-bold leading-tight text-on-primary">{t("home.accessoriesBannerTitle")}</h4>
          </Link>
          <Link
            href="/products?category=computers"
            className="group relative flex aspect-[100/137.35] flex-col overflow-hidden rounded-sm bg-secondary-fixed"
          >
            <Image
              src="/images/lifestyle/tablet.avif"
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 15vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h4 className="relative z-10 p-4 text-body-md font-bold leading-tight text-on-secondary-fixed">{t("home.tabletsBannerTitle")}</h4>
          </Link>
        </div>
      </div>

      {/* Tall headphones banner */}
      <Link
        href="/products?category=audio"
        className="group relative flex flex-col overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm"
      >
        <Image
          src="/images/lifestyle/headphones-college.avif"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 31vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="relative z-10 p-4">
          <p className="mb-1 text-body-sm font-semibold uppercase tracking-wider text-on-surface">{t("home.audioBannerEyebrow")}</p>
          <h4 className="text-body-lg font-bold text-on-surface">{t("home.audioBannerTitle")}</h4>
        </div>
      </Link>
    </section>
  );
}
