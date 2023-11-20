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
  description: "Generated by create next app",
  robots: "index, follow",
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
      <GoogleAnalytics GA_MEASUREMENT_ID="G-X1GF127BV2" />
      <body
        className={`${neueMontreal.variable} ${InterFont.variable} font-sans`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
