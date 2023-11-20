import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loadDictionary = dictionaries[locale];
  if (typeof loadDictionary === "function") {
    const dictionary = await loadDictionary();
    return dictionary;
  } else {
    console.error(`No dictionary found for locale: ${locale}`);
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
};
