import React, {
  useEffect,
  memo,
  useCallback,
  useRef,
  ReactElement,
  useContext,
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
import SearchContext from "../../contexts/SearchState";

export type HandleArrowClickType = (
  classString: "leftClick" | "rightClick",
  direction: "right" | "left"
) => void;

const ArtistDetailsAlbums = ({
  totalAlbums,
  setAlbum,
  album,
}: {
  totalAlbums: number;
  album: AlbumDetailsType | null;
  setAlbum: (direction: "left" | "right") => void;
}): ReactElement => {
  const timeoutId = useRef<NodeJS.Timeout | number>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
  }, [album]);

  const handleClick: HandleArrowClickType = (classString, direction) => {
    const album = document.getElementsByClassName("albumCard")[0];
    album.classList.add(`${classString}`);
    timeoutId.current = setTimeout(() => setAlbum(direction), 100);
    setTimeout(() => album.classList.remove(`${classString}`), 400);
  };

  const renderAlbums = () => {
    if (!totalAlbums || !album) {
      return <h3 className="align-self-center pb-5">No albums</h3>;
    } else {
      return (
        <div className="albumCard">
          <div className="image d-flex justify-content-center">
            {album.images[1] ? (
              <img src={`${album.images[1].url}`} />
            ) : (
              <h3 className="album-no-image">No image</h3>
            )}
          </div>
          <h3 className="header fs-5 text-center w-100 pt-2">{album.name}</h3>
        </div>
      );
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly">
      <LeftArrow
        testId="bigLeft"
        func={handleClick}
        style={totalAlbums ? leftStyle : leftDisabledStyle}
      />
      {renderAlbums()}
      <RightArrow
        testId="bigRight"
        func={handleClick}
        style={totalAlbums ? rightStyle : rightDisabledStyle}
      />
    </section>
  );
};

export default memo(ArtistDetailsAlbums);
