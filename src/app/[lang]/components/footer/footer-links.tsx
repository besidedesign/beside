"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { usePathname, useRouter } from "next/navigation";

interface DictionaryData {
  navigation: {
    services: string;
    benefits: string;
    work: string;
    faq: string;
  };
}

export default function FooterLinks({ lang }: { lang: Locale }) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  useEffect(() => {
    const handleScrollToSection = () => {
      const sectionToScroll = localStorage.getItem("sectionToScroll");
      if (sectionToScroll) {
        const sectionElement = document.getElementById(sectionToScroll);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
        localStorage.removeItem("sectionToScroll");
      }
    };

    if (pathname === `/${lang}`) {
      handleScrollToSection();
    }
  }, [pathname, lang]);

  const handleLinkClick = (section: string) => () => {
    if (pathname === `/${lang}`) {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      localStorage.setItem("sectionToScroll", section);
      router.push(`/${lang}`);
    }
  };

  return (
    <ul className="footer-links flex space-x-[24px]">
      {[
        { id: "services", text: dictionary?.navigation.services },
        { id: "benefits", text: dictionary?.navigation.benefits },
        { id: "work", text: dictionary?.navigation.work },
        { id: "faq", text: dictionary?.navigation.faq },
      ].map((section) => (
        <li
          key={section.id}
          className="span-thick"
          onClick={handleLinkClick(section.id)}
        >
          <Link href={`/${lang}`} scroll={false}>
            <span>{section.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
