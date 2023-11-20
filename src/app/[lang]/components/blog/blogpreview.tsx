import Link from "next/link";
import Image from "next/image";

//components
import BlogCards from "@/app/[lang]/components/blog/blogcards";

//images
import ArrowRight from "@/images/arrow-right.svg";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default async function BlogPreview({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);

  return (
    <section id="blog-preview" className="section-padding">
      <div className="beside-container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
          <h2>{page.blogpreview.title}</h2>
          <Link href="/" className="md:ml-auto">
            <button
              type="button"
              className="beside-btn btn-blog flex items-center justify-center"
            >
              {page.blogpreview.button}
              <Image src={ArrowRight} alt="Arrow Right" className="ml-[10px]" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-[24px]">
          <BlogCards />
        </div>
      </div>
    </section>
  );
}
