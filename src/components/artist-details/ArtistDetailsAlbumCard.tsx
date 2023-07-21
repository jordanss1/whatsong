import { ReactElement, memo } from "react";
import { Variants, motion } from "framer-motion";
import { AlbumDetailsType } from "../../types";
import "./styles/artist-details.css";

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
  return (
    <>
      {album ? (
        <motion.div variants={albumCardVariant} className="album-card">
          <div className="image d-flex justify-content-center">
            {album?.images[1] ? (
              <img src={`${album?.images[1].url}`} />
            ) : (
              <h3 className="card-no-image-album">No image</h3>
            )}
          </div>
          <h3 className="header fs-5 text-center w-100 pt-2">{album?.name}</h3>
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
