"use client";
import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";
import Link from "next/link";

//images
import ArrowRight from "@/images/arrow-right.svg";
import HeaderImage from "@/images/header/header-black.png";

interface DictionaryData {
  page: {
    header: {
      title: string;
      subtitle: string;
      cta_started: string;
      cta_study: string;
    };
  };
}

export default function Header({ lang }: { lang: Locale }) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header id="header" className="flex items-center">
      <div className="beside-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="header-left">
            <h1>{dictionary?.page.header.title}</h1>
            <h6>{dictionary?.page.header.subtitle}</h6>
            <div className="grid grid-cols-2 items-center gap-[8px] md:grid-cols-none md:flex">
              <Link href={`/${lang}/contact`}>
                <button
                  type="button"
                  className="beside-btn btn-header flex items-center justify-center"
                >
                  {dictionary?.page.header.cta_started}
                  <Image
                    src={ArrowRight}
                    alt="Arrow Right"
                    className="ml-[10px]"
                  />
                </button>
              </Link>
              <Link href="#work" onClick={handleScroll}>
                <button type="button" className="beside-btn btn-header-study">
                  {dictionary?.page.header.cta_study}
                </button>
              </Link>
            </div>
          </div>
          <div className="header-right ml-auto">
            <Image
              src={HeaderImage}
              alt="Beside Header Image"
              width={450}
              height={0}
              className="header-right-img"
              quality={100}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
