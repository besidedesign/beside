"use client";
import { useEffect, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

//components
import NavLinks from "@/app/[lang]/components/navbar/navlinks";
import NavPanel from "@/app/[lang]/components/navbar/navpanel";
import NavbarBtn from "@/app/[lang]/components/navbar/navbarbtn";

//imgs
import Logo from "@/images/logo-black.svg";
import BurgerMenu from "@/images/navbar/burger-menu.svg";
import LocaleSwitcher from "@/app/[lang]/components/navbar/locale-switcher";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default function Navbar({ lang }: { lang: Locale }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const handleNavLinkClick = () => {
    burgerButtonRef.current?.click();
  };

  return (
    <Popover
      id="navbar"
      className={`w-full sticky top-0 navbar-bg navbar-border ${
        scrollPosition > 50 ? "navbar-border" : ""
      }`}
    >
      <div className="beside-container">
        <div className="w-full flex justify-between items-center">
          <div className="navbar-left flex items-center">
            <div className="nav-logo mr-[15px]">
              <Link href={`/${lang}`} prefetch>
                <Image src={Logo} alt="" height={16} />
              </Link>
            </div>
            <div className="nav-items md:flex items-center hidden">
              <NavLinks lang={lang} />
            </div>
          </div>
          <div className="navbar-right md:flex items-center hidden">
            <LocaleSwitcher />
            <NavbarBtn lang={lang} />
          </div>
          <div className="flex grow items-center justify-end md:hidden">
            <Popover.Button
              ref={burgerButtonRef}
              className="inline-flex items-center justify-center focus:ring-transparent focus:outline-none navbar-burger"
            >
              <LocaleSwitcher />
              <span className="sr-only">Open menu</span>
              <Image src={BurgerMenu} alt="Burger Menu" width={30} />
            </Popover.Button>
          </div>
        </div>
      </div>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-60" />
      <Transition>
        <NavPanel lang={lang} onNavLinkClick={handleNavLinkClick} />
      </Transition>
    </Popover>
  );
}
