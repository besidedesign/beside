"use client";
import Rive, {
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";

type Props = {
  title: string;
  para: string;
  img: string;
};

export default function BenefitCards(props: Props) {
  const { title, para, img } = props;

  const STATE_MACHINE_NAME = "statemachine";
  const INPUT_NAME = "hover-boolean";

  const { rive, RiveComponent } = useRive({
    src: img,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  });

  const onHoverInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME,
  );

  const onHover = () => {
    if (onHoverInput) {
      onHoverInput.value = true;
    }
  };

  const notOnHover = () => {
    if (onHoverInput) {
      onHoverInput.value = false;
    }
  };

  return (
    <div
      className="benefit-card"
      onMouseEnter={onHover}
      onMouseLeave={notOnHover}
    >
      <div className="card-body">
        <div className="w-[100%] h-[176px]">
          <RiveComponent />
        </div>
      </div>
      <div className="card-header">
        <h5>{title}</h5>
        <p>{para}</p>
      </div>
    </div>
  );
}
