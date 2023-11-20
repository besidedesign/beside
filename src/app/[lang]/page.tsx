import { Locale } from "@/i18n.config";

//components
import Navbar from "@/app/[lang]/components/navbar/navbar";
import Header from "@/app/[lang]/components/header/header";
import Services from "@/app/[lang]/components/services/services";
import Benefits from "@/app/[lang]/components/benefits/benefits";
import Work from "@/app/[lang]/components/work/work";
import FAQ from "@/app/[lang]/components/faq/faq";
import Footer from "@/app/[lang]/components/footer/footer";

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <Navbar lang={params.lang} />
      <Header lang={params.lang} />
      <Services lang={params.lang} />
      <Benefits lang={params.lang} />
      <Work lang={params.lang} />
      <FAQ lang={params.lang} />
      <Footer lang={params.lang} />
    </main>
  );
}
