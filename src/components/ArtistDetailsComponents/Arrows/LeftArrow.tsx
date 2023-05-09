import { memo, ReactElement } from "react";
import { HandleArrowClickType } from "../ArtistAlbums";

interface Props {
  style: string;
  testId: "smallLeft" | "bigLeft";
  func?: HandleArrowClickType | (() => void);
}

type LeftArrowType = (props: Props) => ReactElement;

const LeftArrow: LeftArrowType = ({ func, style, testId }) => {
  return (
    <div
      data-testid={testId}
      onClick={func ? () => func : () => {}}
      className={style}
    >
      <i className="left chevron icon"></i>
    </div>
  );
};

export default memo(LeftArrow);
