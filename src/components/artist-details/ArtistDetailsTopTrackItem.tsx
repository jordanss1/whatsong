import { ReactElement } from "react";
import CircularImage from "../CircularImage";
import { motion } from "framer-motion";
import { TopTracksDetailsType } from "../../types/types";
import { trackAndAlbumVariants } from "./ArtistDetailsAlbumCard";

type ArtistDetailsTopTrackItemPropsType = {
  topTrack: TopTracksDetailsType | null;
  direction: "left" | "right";
};

const ArtistDetailsTopTrackItem = ({
  topTrack,
  direction,
}: ArtistDetailsTopTrackItemPropsType): ReactElement => {
  const image = topTrack?.album.images[0]?.url;

  return (
    <motion.div
      variants={trackAndAlbumVariants}
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      className="d-flex gap-1 align-items-center justify-content-center track-content-container"
    >
      {topTrack ? (
        <>
          <CircularImage image={image} />
          <div className="content top-track-content">{topTrack.name}</div>
        </>
      ) : (
        <h3 className="fs-5">No tracks</h3>
      )}
    </motion.div>
  );
};

export default ArtistDetailsTopTrackItem;
