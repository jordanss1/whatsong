import { ReactElement, memo, useRef } from "react";
import { Variants, motion, useInView } from "framer-motion";
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
  index,
}: ArtistOrAlbumCardType): ReactElement => {
  const artistId = artist?.id ? artist.id : "";
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  if (!index) index = 0;

  if (index % 5 === 0) index = index % 5;
  if (index % 6 === 0) index = index % 5;
  if (index % 7 === 0) index = index % 5;
  if (index % 8 === 0) index = index % 5;
  if (index % 9 === 0) index = index % 5;

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
      whileHover={{
        scale: [null, 1.1],
        y: [null, -5],
        transition: { duration: 0.1 },
      }}
      ref={ref}
      layout
    >
      <motion.div
        style={{
          transform: isInView ? "translateX(0)" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: `all 0.9s ${0.01 * index}s`,
        }}
        onClick={handleProfileClickFunc}
        className="image d-flex justify-content-center align-items-center artist-image"
      >
        {artist?.images[0] ? (
          <img src={artist.images[0].url} />
        ) : (
          <h3 className="card-no-image-artist">No image</h3>
        )}
      </motion.div>
      <motion.h3
        style={{
          transform: isInView ? "translateX(0)" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: `all 0.9s ${0.01 * index}s`,
        }}
        onClick={handleProfileClickFunc}
        className="header fs-5 text-center w-100 pt-2"
      >
        {artist?.name}
      </motion.h3>
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
