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
import ArtistDetailsAlbumCard from "./ArtistDetailsAlbumCard";
import "./styles/artist-details.css";

type ArtistDetailsAlbumsPropsType = {
  album: AlbumDetailsType | null;
  setAlbum: SetAlbumType;
  albums: AlbumDetailsType[] | null;
};

const ArtistDetailsAlbums = ({
  setAlbum,
  album,
  albums,
}: ArtistDetailsAlbumsPropsType): ReactElement => {
  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly album-container">
      <LeftArrow
        testId="bigLeft"
        func={setAlbum}
        style={album && albums ? leftStyle : leftDisabledStyle}
      />
      <ArtistDetailsAlbumCard album={album} />
      <RightArrow
        testId="bigRight"
        func={setAlbum}
        style={album && albums ? rightStyle : rightDisabledStyle}
      />
    </section>
  );
};

export default memo(ArtistDetailsAlbums);
