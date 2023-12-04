"use client";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";
import { Locale } from "@/i18n.config";

export default function CookieBanner({ lang }: { lang: Locale }) {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`md:my-10 mx-auto max-w-max md:max-w-screen-lg
                        fixed bottom-0 left-0 right-0 
                        ${
                          cookieConsent != null ? "hidden" : "flex"
                        } px-3 md:px-4 py-3 justify-between items-center flex-col md:flex-row gap-4 md:gap-12  
                         cookiebanner-bg rounded-lg shadow`}
    >
      <div className="text-center md:!text-left">
        <p>
          We use cookies (and other similar technologies) to improve your
          experience on our site. By using this website you agree to our{" "}
          <Link href={`/${lang}/privacy-policy`}>
            <span className="cookie-anchor">Cookie Policy</span>
          </Link>
          .
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="beside-btn cookie-decline"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="beside-btn cookie-allow"
          onClick={() => setCookieConsent(true)}
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
