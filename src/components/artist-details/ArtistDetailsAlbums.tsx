import { useEffect, memo, useRef, ReactElement } from "react";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import {
  leftStyle,
  leftDisabledStyle,
  rightStyle,
  rightDisabledStyle,
} from "../../styles/inline";
import { AlbumDetailsType } from "../../types";
import { SetAlbumType } from "../../hooks/DetailedArtistResultHooks";

const ArtistDetailsAlbums = ({
  setAlbum,
  album,
  albums,
}: {
  album: AlbumDetailsType | null;
  setAlbum: SetAlbumType;
  albums: AlbumDetailsType[] | [];
}): ReactElement => {
  const timeoutId = useRef<NodeJS.Timeout | number>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
  }, [album]);

  const renderAlbum = () => {
    if (!album) {
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
    <section className="d-flex flex-row justify-content-center justify-content-evenly album-container">
      <LeftArrow
        testId="bigLeft"
        func={setAlbum}
        style={album && albums.length > 1 ? leftStyle : leftDisabledStyle}
      />
      {renderAlbum()}
      <RightArrow
        testId="bigRight"
        func={setAlbum}
        style={album && albums.length > 1 ? rightStyle : rightDisabledStyle}
      />
    </section>
  );
};

export default memo(ArtistDetailsAlbums);
