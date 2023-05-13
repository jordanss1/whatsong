import { memo, ReactElement } from "react";
import { HandleArrowClickType } from "../ArtistDetailsAlbums";

interface Props {
  style: string;
  testId: "smallRight" | "bigRight";
  func: HandleArrowClickType;
}

type RightArrowType = (props: Props) => ReactElement;

const RightArrow: RightArrowType = ({ func, style, testId }) => {
  return (
    <div
      data-testid={testId}
      onClick={() => func("rightClick", "right")}
      className={style}
    >
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default memo(RightArrow);
