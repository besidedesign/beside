import { Locale } from "@/i18n.config";

//components
import Navbar from "@/app/[lang]/components/navbar/navbar";
import ThankYouContent from "@/app/[lang]/components/thank-you/thankyoucontent";
import Footer from "@/app/[lang]/components/footer/footer";

export default function ThankYou({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <Navbar lang={params.lang} />
      <ThankYouContent lang={params.lang} />
      <Footer lang={params.lang} />
    </main>
  );
}
