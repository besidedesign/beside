import Link from "next/link";

//components
import ServiceCards from "@/app/[lang]/components/services/servcard";

//images
import ArrowRight from "@/images/arrow-right.svg";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default async function Services({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);
  const servicecards = page.services.servicecards;

  return (
    <section id="services" className="section-padding">
      <div className="beside-container">
        <div className="serv-heading">
          <h2>{page.services.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <h6>{page.services.subtitle}</h6>
          <Link href={`/${lang}/contact`} className="md:ml-auto">
            <button
              type="button"
              className="beside-btn services-btn flex items-center justify-center"
            >
              {page.services.button}
              <Image src={ArrowRight} alt="Arrow Right" className="ml-[10px]" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {servicecards.map((servicecard, index) => {
            return (
              <ServiceCards
                key={index}
                title={servicecard.title}
                para={servicecard.para}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
