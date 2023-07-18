import { ReactElement, memo } from "react";
import { Variants, motion } from "framer-motion";
import { AlbumDetailsType, ArtistsType } from "../../types";
import "./styles/artist-details.css";

type ArtistOrAlbumCardType = {
  cardType: "artist" | "album";
  album?: AlbumDetailsType | null;
  artist?: ArtistsType;
  handleProfileClick?: (id: string) => void;
  index?: number;
};

const artistCardVariant: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const albumCardVariant: Variants = {
  initial: {},
  animate: {},
};

const ArtistOrAlbumCard = ({
  cardType,
  album,
  artist,
  handleProfileClick,
}: ArtistOrAlbumCardType): ReactElement => {
  const artistId = artist?.id ? artist.id : "";

  let handleProfileClickFunc = handleProfileClick
    ? () => handleProfileClick(artistId)
    : () => {};

  const renderAlbumCard = album ? (
    <motion.div variants={albumCardVariant} className="artist-album-card">
      <div className="image d-flex justify-content-center">
        {album.images[1] ? (
          <img src={`${album.images[1].url}`} />
        ) : (
          <h3 className="card-no-image-album">No image</h3>
        )}
      </div>
      <h3 className="header fs-5 text-center w-100 pt-2">{album.name}</h3>
    </motion.div>
  ) : (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <h3 className="align-self-center pb-5">No albums</h3>
    </div>
  );

  const renderArtistCard = (
    <motion.div
      variants={artistCardVariant}
      className="artist-album-card"
      title="View artist profile"
      layout
    >
      <div
        onClick={handleProfileClickFunc}
        className="image d-flex justify-content-center align-items-center artist-image"
      >
        {artist?.images[0] ? (
          <img src={artist.images[0].url} />
        ) : (
          <h3 className="card-no-image-artist">No image</h3>
        )}
      </div>
      <h3
        onClick={handleProfileClickFunc}
        className="header fs-5 text-center w-100 pt-2"
      >
        {artist?.name}
      </h3>
    </motion.div>
  );

  return (
    <>
      {cardType === "album" && renderAlbumCard}
      {cardType === "artist" && renderArtistCard}
    </>
  );
};

export default memo(ArtistOrAlbumCard);
