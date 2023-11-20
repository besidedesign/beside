import Link from "next/link";
import Image from "next/image";

//components
import BenefitCards from "@/app/[lang]/components/benefits/benefitcard";

//images
import ArrowRight from "@/images/arrow-right-dark.svg";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default async function Benefits({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);
  const benefitcards = page.benefits.benefitcards;

  return (
    <section id="benefits" className="section-padding">
      <div className="beside-container">
        <div className="benefits-heading">
          <h2>{page.benefits.title}</h2>
          <h6>{page.benefits.subtitle}</h6>
          <Link href={`/${lang}/contact`}>
            <button
              type="button"
              className="beside-btn benefits-btn flex items-center justify-center"
            >
              {page.benefits.button}
              <Image src={ArrowRight} alt="Arrow Right" className="ml-[10px]" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {benefitcards.map((benefitcard, index) => {
            return (
              <BenefitCards
                key={index}
                title={benefitcard.title}
                para={benefitcard.para}
                img={benefitcard.img}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
