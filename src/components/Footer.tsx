"use client";

import Link from "next/link";
import { Share2, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const columns: { title: string; links: string[] }[] = [
    { title: t("footer.supportColumn"), links: ["helpCenter", "returnPolicy", "productRecalls"] },
    { title: t("footer.companyColumn"), links: ["corporateResponsibility", "privacySecurity", "investorRelations"] },
    { title: t("footer.shopColumn"), links: ["termsOfUse", "careers", "storeFinder"] },
  ];

  return (
    <footer className="mt-margin-desktop w-full border-t border-surface-variant bg-surface-container-lowest px-margin-mobile py-12 md:px-margin-desktop">
      <div className="mx-auto flex w-full max-w-full lg:max-w-container-max flex-col items-start justify-between gap-8 md:flex-row">
        <div className="max-w-sm">
          <div className="mb-4 text-headline-md font-headline-md text-primary">{t("brand")}</div>
          <p className="mb-6 text-body-sm text-on-surface-variant">{t("footer.about")}</p>
          <div className="flex gap-4">
            <a href="#" className="text-outline transition-colors hover:text-primary" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </a>
            <a href="#" className="text-outline transition-colors hover:text-primary" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="grid w-full max-w-2xl grid-cols-2 gap-8 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-label-bold font-label-bold text-on-surface">{column.title}</span>
              {column.links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-label-bold font-label-bold text-on-surface-variant transition-all hover:text-primary hover:underline"
                >
                  {t(`footer.${link}`)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-stack-lg w-full max-w-full lg:max-w-container-max border-t border-surface-variant pt-stack-md">
        <p className="text-body-sm text-on-surface-variant">{t("footer.copyright", { year })}</p>
      </div>
    </footer>
  );
}
