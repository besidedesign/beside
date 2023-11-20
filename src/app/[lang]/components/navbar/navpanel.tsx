import { useState } from "react";
import { Popover } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

//components
import NavLinks from "@/app/[lang]/components/navbar/navlinks";
import NavbarBtn from "@/app/[lang]/components/navbar/navbarbtn";

//imgs
import Logo from "@/images/logo-black.svg";
import { Locale } from "@/i18n.config";

interface NavPanelProps {
  onNavLinkClick: () => void;
}

export default function NavPanel({
  onNavLinkClick,
  lang,
}: NavPanelProps & { lang: Locale }) {
  return (
    <Popover.Panel
      focus
      className="absolute inset-x-0 top-0 origin-top-right transform transition md:hidden"
    >
      <div className="navbg-responsive">
        <div className="px-[20px] pt-[20px] h-screen">
          <div className="flex items-center justify-between">
            <div className="nav-logo">
              <Link href={`/${lang}`} prefetch>
                <Image src={Logo} alt="" height={16} />
              </Link>
            </div>
            <div className="-mr-2">
              <Popover.Button className="inline-flex items-center justify-center p-2 focus:outline-none focus:ring-transparent navbar-burger">
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-8">
              <NavLinks lang={lang} onNavLinkClick={onNavLinkClick} />
            </nav>
          </div>
          <div className="flex flex-col gap-2 mobile-btn-nav">
            <span>Get in touch</span>
            <NavbarBtn lang={lang} />
          </div>
        </div>
      </div>
    </Popover.Panel>
  );
}
