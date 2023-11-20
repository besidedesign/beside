import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";

//images
import FooterImage from "@/images/footer/footer.png";

export default async function CallToAction({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);

  return (
    <div className="call-to-action-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:items-center lg:gap-[40px]">
        <div className="test-example-grid">
          <div className="call-to-action-body">
            <Image
              src={FooterImage}
              alt="Beside Footer Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              quality={100}
            />
          </div>
        </div>
        <div className="call-to-action-header">
          <h3>{page.footer.call_to_action.title}</h3>
          <h6>{page.footer.call_to_action.subtitle}</h6>
          <div className="grid grid-cols-2 gap-[8px] md:grid-cols-none md:flex">
            <Link href={`/${lang}/contact`}>
              <button type="button" className="beside-btn cta-btn-one">
                {page.footer.call_to_action.button_one}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
