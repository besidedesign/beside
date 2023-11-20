import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";

interface DictionaryData {
  navigation: {
    navbtn: string;
  };
}

export default function NavbarBtn({ lang }: { lang: Locale }) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  return (
    <Link href={`/${lang}/contact`}>
      <button type="button" className="beside-btn btn-nav">
        {dictionary?.navigation.navbtn}
      </button>
    </Link>
  );
}
