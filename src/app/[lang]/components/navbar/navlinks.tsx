import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";

interface DictionaryData {
  navigation: {
    services: string;
    benefits: string;
    work: string;
    faq: string;
  };
}

export default function NavLinks({
  lang,
  onNavLinkClick,
}: {
  lang: Locale;
  onNavLinkClick?: () => void;
}) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
    //onNavLinkClick?.();
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "header" || entry.target.id === "footer") {
              setActiveSection(null);
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    const sectionIds = [
      "services",
      "benefits",
      "work",
      "faq",
      "header",
      "footer",
    ];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [lang]);

  return (
    <ul className="nav-links md:flex md:items-center">
      {[
        { id: "services", text: dictionary?.navigation.services },
        { id: "benefits", text: dictionary?.navigation.benefits },
        { id: "work", text: dictionary?.navigation.work },
        { id: "faq", text: dictionary?.navigation.faq },
      ].map((section) => (
        <li
          key={section.id}
          className={`nav-link ${activeSection === section.id ? "active" : ""}`}
          onClick={handleLinkClick(section.id)}
        >
          <Link href={`/${lang}`} scroll={false} onClick={onNavLinkClick}>
            <span>{section.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
