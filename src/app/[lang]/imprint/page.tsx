import { Locale } from "@/i18n.config";

//components
import Navbar from "@/app/[lang]/components/navbar/navbar";
import ImprintContent from "@/app/[lang]/components/imprint/imprint";
import Footer from "@/app/[lang]/components/footer/footer";

export default function Imprint({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <Navbar lang={params.lang} />
      <ImprintContent />
      <Footer lang={params.lang} />
    </main>
  );
}
