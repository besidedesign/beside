import GoogleAnalytics from "@/app/[lang]/components/GoogleAnalytics";
import CookieBanner from "@/app/[lang]/components/CookieBanner";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import "../main.css";
import "../responsive.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../../fonts/NeueMontreal/NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/NeueMontreal/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/NeueMontreal/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/NeueMontreal/NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montreal",
});

const InterFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Beside | UI/UX Design Agency",
  description:
    "Looking to give your business a digital makeover? At Beside, we're not just a Web Design Agency – we're your partners in growth. Make your mark online with eye-catching websites that really speak to your customers. From the first sketch to the final launch, we cover all: intuitive Web Design, solid Development, smart Website Strategy, and those tricky Custom Integrations you've been thinking about. Why settle for just online presence when Beside can make you a standout? Let's build something awesome together.",
  keywords:
    "Best Web Design Agency, Website Growth Strategies, Top SEO Web Designers, Web Development Experts, Effective Website Planning, Custom Website Integration Services, Business Website Optimization, Modern Responsive Web Design, Convert Traffic into Sales, Improve Online Business Presence, Professional Website Overhaul, User-Centric Web Solutions, Increase Website Traffic, Full-Service Web Agency, Boost Online Visibility, Web Design Best Practices, Lead-Generating Websites, Web Strategy for Growth, Seamless Website Integration",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-HNNSRWEKNR" />
      <body
        className={`${neueMontreal.variable} ${InterFont.variable} font-sans`}
      >
        {children}
        <CookieBanner lang={params.lang} />
      </body>
    </html>
  );
}
