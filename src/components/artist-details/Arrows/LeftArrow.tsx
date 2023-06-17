import { memo, ReactElement } from "react";
import {
  SetAlbumType,
  TrackOrAlbumFuncType as SetTopTrackType,
} from "../../../hooks/DetailedArtistResultHooks";
import "../styles/artist-details.css";

export type SetterUnion = SetAlbumType | SetTopTrackType;

interface Props {
  style: string;
  testId: "smallLeft" | "bigLeft";
  func: SetterUnion;
}

type LeftArrowType = (props: Props) => ReactElement;

export const funcIsSetAlbumType = (func: SetterUnion): func is SetAlbumType => {
  return func.name === "setAlbum";
};

const LeftArrow: LeftArrowType = ({ func, style, testId }) => {
  const returnTrueFunc = (): void => {
    if (funcIsSetAlbumType(func)) {
      return func("leftClick", "left");
    }

    return func("left", "track");
  };

  return (
    <div
      data-testid={testId}
      onClick={() => returnTrueFunc()}
      className={style}
    >
      <i className="left chevron icon"></i>
    </div>
  );
};

export default memo(LeftArrow);
