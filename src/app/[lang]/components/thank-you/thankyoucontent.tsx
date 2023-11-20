import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

//icons
import MailSend from "@/images/contact/mail-send.svg";
//import ArrowRight from "@/images/arrow-right.svg";

export default async function ThankYouContent({ lang }: { lang: Locale }) {
  const { thank_you } = await getDictionary(lang);

  return (
    <section id="thankyou">
      <div className="stackd-container">
        <div className="thankcontent">
          <Image src={MailSend} alt="Mail Send" className="mailsend" />
          <h1>{thank_you.headline}</h1>
          <p>{thank_you.paragraph}</p>
          <div className="flex justify-center">
            <Link href={`/${lang}`} className="flex items-center">
              {thank_you.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
