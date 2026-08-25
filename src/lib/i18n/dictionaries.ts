import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";

export type Locale = "en" | "ar";

export const dictionaries = { en, ar };

export type Dictionary = typeof en;
