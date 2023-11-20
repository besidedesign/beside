type Props = {
  title: string;
  para: string;
};

export default function ServiceCards(props: Props) {
  const { title, para } = props;

  return (
    <div className="service-card">
      <h5>{title}</h5>
      <p>{para}</p>
    </div>
  );
}
