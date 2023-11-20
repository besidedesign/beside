import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

//components
import CallToAction from "@/app/[lang]/components/footer/calltoaction";
import FooterLinks from "@/app/[lang]/components/footer/footer-links";
import Socials from "@/app/[lang]/components/footer/socials";

//images
import LogoWhite from "@/images/logo-wh.svg";

export default async function Footer({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);

  return (
    <footer id="footer" className="section-padding">
      <div className="beside-container">
        <CallToAction lang={lang} />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="footer-left">
            <Image
              src={LogoWhite}
              alt="Beside Logo White"
              className="footer-logo"
            />
            <Socials />
          </div>
          <div className="footer-right md:ml-auto">
            <div className="footer-footer-links mt-[32px] md:mt-0">
              <FooterLinks lang={lang} />
            </div>
          </div>
        </div>
        <hr className="footer-hr" />
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
          <div className="footer-copyright md:flex md:space-y-0 md:space-x-[24px]">
            <span className="copyright">
              &copy; {new Date().getFullYear()} Beside
            </span>
            <Link href={`/${lang}/imprint`} prefetch>
              <span className="impterms">{page.footer.terms}</span>
            </Link>
            <Link href={`/${lang}/privacy-policy`} prefetch>
              <span className="impterms">{page.footer.privacy}</span>
            </Link>
          </div>
          <div className="footer-right md:ml-auto">
            <Link
              href="mailto:business@beside.design"
              className="contactmail span-thick"
            >
              business@beside.design
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
