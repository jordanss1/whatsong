import { ReactElement, memo } from "react";
import { Variants, motion } from "framer-motion";
import { AlbumDetailsType } from "../../types";
import "./styles/artist-details.css";
import ImageCard from "../ImageCard";
import ImageHeader from "../ImageHeader";

type ArtistDetailsAlbumCardPropsType = {
  album: AlbumDetailsType | null;
};

const albumCardVariant: Variants = {
  initial: {},
  animate: {},
};

const ArtistDetailsAlbumCard = ({
  album,
}: ArtistDetailsAlbumCardPropsType): ReactElement => {
  const image = album?.images[1].url;

  return (
    <>
      {album ? (
        <motion.div variants={albumCardVariant} className="album-card">
          <ImageCard url={image} />
          <ImageHeader text={album.name} />
        </motion.div>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3 className="align-self-center pb-5">No albums</h3>
        </div>
      )}
    </>
  );
};

export default memo(ArtistDetailsAlbumCard);
