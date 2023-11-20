//components
import { AccordionDemo } from "@/app/[lang]/components/faq/accordion";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default async function FAQ({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);

  return (
    <section id="faq" className="section-padding">
      <div className="beside-container">
        <div className="faq-heading">
          <h2>{page.faq.title}</h2>
          <h6>{page.faq.subtitle}</h6>
        </div>
        <AccordionDemo lang={lang} />
      </div>
    </section>
  );
}
