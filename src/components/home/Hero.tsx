"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="flex flex-col items-center gap-6 rounded-sm bg-gradient-to-r from-primary-container to-primary px-6 py-8 text-on-primary md:min-h-52 md:flex-row md:justify-between md:gap-8 md:px-10">
      <span className="inline-block shrink-0 self-center rounded-sm bg-surface-container-lowest px-5 py-3 text-label-bold font-label-bold text-primary shadow-sm">
        {t("home.heroEyebrow")}
      </span>

      <div className="flex flex-1 flex-col items-center gap-2 text-center">
        <h1 className="text-headline-xl-mobile font-headline-xl-mobile md:text-headline-lg md:font-headline-lg">{t("home.heroTitle")}</h1>
        <p className="max-w-md text-body-sm text-primary-fixed md:text-body-md">{t("home.heroSubtitle")}</p>
        <Link
          href="/products?category=computers"
          className="mt-2 inline-block rounded-full bg-surface-container-lowest px-6 py-2.5 text-label-bold font-label-bold text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
        >
          {t("home.heroCta")}
        </Link>
      </div>

      <div className="relative h-32 w-44 shrink-0 overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm md:h-36 md:w-52">
        <Image
          src="/images/lifestyle/hero-laptop.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 176px, 208px"
          className="object-contain p-3"
        />
      </div>
    </section>
  );
}
