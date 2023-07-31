import { memo, ReactElement } from "react";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import {
  leftStyle,
  leftDisabledStyle,
  rightStyle,
  rightDisabledStyle,
} from "../../styles/inline";
import { AlbumDetailsType } from "../../types/types";
import { SetAlbumType } from "../../hooks/DetailedArtistResultHooks";
import ArtistDetailsAlbumCard from "./ArtistDetailsAlbumCard";
import { motion, Variants } from "framer-motion";
import "./styles/artist-details.css";

type ArtistDetailsAlbumsPropsType = {
  album: AlbumDetailsType | null;
  setAlbum: SetAlbumType;
  albums: AlbumDetailsType[] | null;
};

const albumsVariants: Variants = {
  initial: {
    x: -70,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const ArtistDetailsAlbums = ({
  setAlbum,
  album,
  albums,
}: ArtistDetailsAlbumsPropsType): ReactElement => {
  return (
    <motion.section
      variants={albumsVariants}
      className="d-flex flex-row justify-content-center align-items-center justify-content-evenly album-container"
    >
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
    </motion.section>
  );
};

export default memo(ArtistDetailsAlbums);
