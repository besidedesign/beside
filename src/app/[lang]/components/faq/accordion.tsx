import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/[lang]/components/ui/accordion";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export async function AccordionDemo({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);
  const faq_questions = page.faq.faq_questions;

  return (
    <Accordion type="single" collapsible className="w-full">
      {faq_questions.map((faq_question, index) => (
        <AccordionItem
          key={index}
          value={faq_question.title}
          className="faq-card"
        >
          <AccordionTrigger className="faq-title">
            {faq_question.title}
          </AccordionTrigger>
          <AccordionContent className="faq-content">
            {faq_question.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
