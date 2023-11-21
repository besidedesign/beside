import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

//components
import WorkCards from "@/app/[lang]/components/work/workcard";

//images
import NewTab from "@/images/new-tab.svg";

export default async function Work({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);
  const workcards = page.work.workcards;

  return (
    <section id="work" className="section-padding">
      <div className="beside-container">
        <div className="work-heading">
          <h2>{page.work.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <h6>{page.work.subtitle}</h6>
          <Link
            href="https://www.figma.com/proto/woWazDNnpb3Q8VzbgiJAGm/Sample-Work?type=design&node-id=0%3A1&mode=design&t=VamHPuvz9qTEJ4hY-1"
            className="md:ml-auto"
            target="_blank"
          >
            <button
              type="button"
              className="beside-btn work-btn flex items-center justify-center"
            >
              {page.work.button}
              <Image src={NewTab} alt="New Tab" className="ml-[10px]" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr,1fr] lg:grid-cols-[35%,65%] gap-[24px]">
          {workcards.map((workcard, index) => {
            return (
              <WorkCards
                key={index}
                title={workcard.title}
                para={workcard.para}
                img={workcard.img}
                imgClass={workcard.img_class}
                cardBodyClass={workcard.cardBodyClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
