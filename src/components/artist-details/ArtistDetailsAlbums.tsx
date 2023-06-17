import { memo, ReactElement } from "react";
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
import ArtistOrAlbumCard from "./ArtistOrAlbumCard";
import "./styles/artist-details.css";

const ArtistDetailsAlbums = ({
  setAlbum,
  album,
  albums,
}: {
  album: AlbumDetailsType | null;
  setAlbum: SetAlbumType;
  albums: AlbumDetailsType[] | [];
}): ReactElement => {
  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly album-container">
      <LeftArrow
        testId="bigLeft"
        func={setAlbum}
        style={album && albums.length > 1 ? leftStyle : leftDisabledStyle}
      />
      <ArtistOrAlbumCard cardType="album" album={album} />
      <RightArrow
        testId="bigRight"
        func={setAlbum}
        style={album && albums.length > 1 ? rightStyle : rightDisabledStyle}
      />
    </section>
  );
};

export default memo(ArtistDetailsAlbums);
