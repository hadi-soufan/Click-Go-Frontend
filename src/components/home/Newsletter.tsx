"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Newsletter() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="rounded-sm bg-deep-navy p-6 text-on-primary md:p-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <Mail className="h-8 w-8 text-secondary-container" />
        <h2 className="text-headline-md font-headline-md">{t("home.newsletterTitle")}</h2>
        <p className="text-body-md text-primary-fixed">{t("home.newsletterSubtitle")}</p>
        {submitted ? (
          <p className="text-body-md font-semibold text-secondary-container">{t("home.newsletterThanks")}</p>
        ) : (
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("home.newsletterPlaceholder")}
              className="h-12 w-full flex-1 rounded-full border-none bg-surface-container-lowest px-4 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-secondary-container"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-secondary-container px-6 text-label-bold font-label-bold text-on-secondary-container transition-colors hover:bg-secondary-fixed-dim"
            >
              {t("home.newsletterCta")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
