import Image from "next/image";

type Props = {
  title: string;
  para: string;
  img?: string;
  imgClass: string;
  cardBodyClass: string;
};

export default function WorkCards(props: Props) {
  const { title, para, img, imgClass, cardBodyClass } = props;

  return (
    <div className="work-card">
      <div className="work-card-header">
        <h5>{title}</h5>
        <p>{para}</p>
      </div>
      {img && (
        <div className={cardBodyClass}>
          <Image
            src={img}
            alt={title}
            width={0}
            height={0}
            className={imgClass}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            quality={100}
          />
        </div>
      )}
    </div>
  );
}
