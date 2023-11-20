//components
import Navbar from "@/app/[lang]/components/navbar/navbar";
import PrivacyContent from "@/app/[lang]/components/privacy/privacy";
import Footer from "@/app/[lang]/components/footer/footer";
import { Locale } from "@/i18n.config";

export default function PrivacyPolicy({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <main>
      <Navbar lang={params.lang} />
      <PrivacyContent />
      <Footer lang={params.lang} />
    </main>
  );
}
