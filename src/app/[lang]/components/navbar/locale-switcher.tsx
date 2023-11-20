"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n, Locale } from "@/i18n.config";
import { useEffect, useState } from "react";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState("defaultLocale");

  useEffect(() => {
    const pathSegments = pathName.split("/");
    const languageSegment = pathSegments[1] || "defaultLocale";
    setCurrentLanguage(languageSegment);
  }, [pathName]);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex locale-switcher-size">
      {i18n.locales.map((locale, index) => {
        const isActive = locale === currentLanguage;
        return (
          <li key={locale}>
            {index > 0 && <span className="locale-border">|</span>}
            <Link
              href={redirectedPathName(locale)}
              className={`locale-switcher ${isActive ? "active-locale" : ""}`}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
