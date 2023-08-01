import { ReactElement } from "react";
import { Variants, motion } from "framer-motion";
import { AlbumDetailsType } from "../../types/types";
import ImageCard from "../ImageCard";
import ImageHeader from "../ImageHeader";
import "./styles/artist-details.css";

type ArtistDetailsAlbumCardPropsType = {
  album: AlbumDetailsType | null;
  direction: "left" | "right";
};

const albumVariants: Variants = {
  initial: (direction) => ({
    scale: 0.9,
    opacity: 0,
    x: direction === "left" ? 80 : -80,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.1,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === "left" ? [null, -80] : [null, 80],
    scale: [null, 0.9],
    transition: {
      type: "tween",
      duration: 0.15,
    },
  }),
};

const ArtistDetailsAlbumCard = ({
  album,
  direction,
}: ArtistDetailsAlbumCardPropsType): ReactElement => {
  const image = album?.images[1].url;

  return (
    <>
      {album ? (
        <motion.div
          variants={albumVariants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          className="album-card"
        >
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

export default ArtistDetailsAlbumCard;
