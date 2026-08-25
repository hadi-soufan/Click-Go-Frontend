import type { Locale } from "./i18n/dictionaries";
import type { LocalizedText } from "@/types/product";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function localize(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en;
}
