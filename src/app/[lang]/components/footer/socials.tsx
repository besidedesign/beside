import Link from "next/link";

//images
import Twitter from "@/images/footer/socials/twitter.svg";
import Instagram from "@/images/footer/socials/instagram.svg";
import Dribbble from "@/images/footer/socials/dribbble.svg";
import LinkedIn from "@/images/footer/socials/linkedin.svg";
import Image from "next/image";

export default function Socials() {
  return (
    <div className="flex items-center space-x-[8px]">
      <Link href="https://twitter.com/besideglobal" target="_blank">
        <Image src={Twitter} alt="Twitter Logo" />
      </Link>
      <Link href="https://www.instagram.com/beside.design/" target="_blank">
        <Image src={Instagram} alt="Instagram Logo" />
      </Link>
      <Link href="https://dribbble.com/beside" target="_blank">
        <Image src={Dribbble} alt="Dribbble Logo" />
      </Link>
      <Link
        href="https://www.linkedin.com/company/besideglobal/"
        target="_blank"
      >
        <Image src={LinkedIn} alt="LinkedIn Logo" />
      </Link>
    </div>
  );
}
