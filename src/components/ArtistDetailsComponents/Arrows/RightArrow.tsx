import { memo, ReactElement } from "react";

interface Props {
  style: string;
  testId: "smallRight" | "bigRight";
  func?: () => void;
}

type RightArrowType = (props: Props) => ReactElement;

const RightArrow: RightArrowType = ({ func, style, testId }) => {
  return (
    <div
      data-testid={testId}
      onClick={func ? func : () => {}}
      className={style}
    >
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default memo(RightArrow);
