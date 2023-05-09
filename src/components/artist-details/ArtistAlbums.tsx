import React, {
  useEffect,
  memo,
  useCallback,
  useRef,
  ReactElement,
} from "react";
import Loader from "../Loader";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import {
  leftStyle,
  leftDisabledStyle,
  rightStyle,
  rightDisabledStyle,
} from "../../styles/inline";
import { AlbumDetailsType } from "../../types";

export type HandleArrowClickType = (
  classString: "leftClick" | "rightClick",
  func: (prev: number) => number
) => void;

const ArtistAlbums = ({
  albums,
  totalAlbums,
  setFilteredAlbum,
  filteredAlbum,
}: {
  albums: AlbumDetailsType[] | [];
  totalAlbums: number;
  setFilteredAlbum: React.Dispatch<React.SetStateAction<number>>;
  filteredAlbum: number;
}): ReactElement => {
  const timeoutId = useRef<NodeJS.Timeout | number>();

  useEffect(() => {
    setFilteredAlbum(0);
  }, []);

  useEffect(() => {
    clearTimeout(timeoutId.current);
  }, [filteredAlbum]);

  const handleClick: HandleArrowClickType = (classString, func) => {
    const album = document.getElementsByClassName("albumCard")[0];
    album.classList.add(`${classString}`);
    timeoutId.current = setTimeout(() => setFilteredAlbum(func), 100);
    setTimeout(() => album.classList.remove(`${classString}`), 400);
  };

  const arrowProps = {
    leftClick: useCallback(
      () => handleClick("leftClick", (prev) => prev - 1),
      []
    ),
    rightClick: useCallback(
      () => handleClick("rightClick", (prev) => prev + 1),
      []
    ),
  };

  const renderLeftArrow = () => {
    if (filteredAlbum === 0 || !totalAlbums) {
      return <LeftArrow testId="bigLeft" style={leftDisabledStyle} />;
    } else {
      return (
        <LeftArrow
          testId="bigLeft"
          func={arrowProps.leftClick}
          style={leftStyle}
        />
      );
    }
  };

  const renderRightArrow = () => {
    if (filteredAlbum === totalAlbums - 1 || !totalAlbums) {
      return <RightArrow testId="bigRight" style={rightDisabledStyle} />;
    } else {
      return (
        <RightArrow
          testId="bigRight"
          func={arrowProps.rightClick}
          style={rightStyle}
        />
      );
    }
  };

  const renderAlbums = () => {
    if (!albums) {
      return (
        <div className="ui raised centered card albumCard">
          <div className="image">
            <Loader />
          </div>
          <div className="content"></div>
        </div>
      );
    } else if (!totalAlbums) {
      return <h3 className="align-self-center pb-5">No albums</h3>;
    } else if (totalAlbums && albums && albums[filteredAlbum]) {
      const { name, images } = albums[filteredAlbum];

      return (
        <div className="ui raised card albumCard">
          <div className="image d-flex justify-content-center pt-1 ps-1">
            {images[1] ? <img src={`${images[1].url}`} /> : <h3>No image</h3>}
          </div>
          <div className="content d-flex align-items-center justify-content-center p-0">
            <h3 className="header fs-5 text-center w-100 px-1">{name}</h3>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly">
      {renderLeftArrow()}
      {renderAlbums()}
      {renderRightArrow()}
    </section>
  );
};

export default memo(ArtistAlbums);
