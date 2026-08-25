"use client";

import { Truck, BadgeCheck, RotateCcw } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const items = [
  { icon: Truck, titleKey: "home.whyUs1Title", descKey: "home.whyUs1Desc" },
  { icon: BadgeCheck, titleKey: "home.whyUs2Title", descKey: "home.whyUs2Desc" },
  { icon: RotateCcw, titleKey: "home.whyUs3Title", descKey: "home.whyUs3Desc" },
];

export function ValueProps() {
  const { t } = useLocale();

  return (
    <section className="rounded-sm bg-gradient-to-r from-primary-container to-primary p-6 text-on-primary md:p-10">
      <h2 className="mb-6 text-headline-md font-headline-md text-on-primary">{t("home.whyUsTitle")}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.titleKey} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-body-lg font-semibold text-on-primary">{t(item.titleKey)}</h3>
                <p className="text-body-sm text-primary-fixed">{t(item.descKey)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
