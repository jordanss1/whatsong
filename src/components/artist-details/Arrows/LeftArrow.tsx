import { memo, ReactElement, MouseEventHandler } from "react";
import { HandleArrowClickType } from "../ArtistDetailsAlbums";

interface Props {
  style: string;
  testId: "smallLeft" | "bigLeft";
  func?: HandleArrowClickType;
}

type LeftArrowType = (props: Props) => ReactElement;

const LeftArrow: LeftArrowType = ({ func, style, testId }) => {
  return (
    <div
      data-testid={testId}
      onClick={func ? () => func("leftClick", "left") : () => {}}
      className={style}
    >
      <i className="left chevron icon"></i>
    </div>
  );
};

export default memo(LeftArrow);
