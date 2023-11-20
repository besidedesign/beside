import { Locale } from "@/i18n.config";

//components
import Navbar from "@/app/[lang]/components/navbar/navbar";
import ContactContent from "@/app/[lang]/components/contact/contact";
import Footer from "@/app/[lang]/components/footer/footer";

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <Navbar lang={params.lang} />
      <ContactContent lang={params.lang} />
      <Footer lang={params.lang} />
    </main>
  );
}
