import { memo, ReactElement } from "react";
import { funcIsSetAlbumType, SetterUnion } from "./LeftArrow";

interface Props {
  style: string;
  testId: "smallRight" | "bigRight";
  func: SetterUnion;
}

type RightArrowType = (props: Props) => ReactElement;

const RightArrow: RightArrowType = ({ func, style, testId }) => {
  const returnTrueFunc = (): void => {
    if (funcIsSetAlbumType(func)) {
      return func("rightClick", "right");
    }

    return func("right", "track");
  };

  return (
    <div
      data-testid={testId}
      onClick={() => returnTrueFunc()}
      className={style}
    >
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default memo(RightArrow);
