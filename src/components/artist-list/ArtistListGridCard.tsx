import { ReactElement, memo, useRef } from "react";
import { Variants, motion, useInView, AnimatePresence } from "framer-motion";
import { ArtistsType } from "../../types";
import { HandleProfileClickType } from "../artist-list/ArtistListGrid";
import "./styles/artist-list.css";

type ArtistListGridCardPropType = {
  artist: ArtistsType;
  handleClick: HandleProfileClickType;
  index: number;
  searched: boolean;
};

const artistCardVariant: Variants = {
  initial: {
    x: -75,
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: 75,
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const artistOrchestrationVariant: Variants = {
  initial: {
    x: -75,
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: {
    x: 75,
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.05 },
  },
};

const ArtistListGridCard = ({
  artist,
  handleClick,
  index,
  searched,
}: ArtistListGridCardPropType): ReactElement => {
  const artistId = artist?.id ? artist.id : "";
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  if (!index) index = 0;

  if (index % 0) index = 0;
  if (index % 1) index = 1;
  if (index % 2) index = 2;
  if (index % 3) index = 3;
  if (index % 4) index = 4;
  if (index % 5) index = 5;

  let transform = isInView ? "translateX(0)" : "translateX(-75px)";
  let opacity = isInView ? 1 : 0;

  let handleClickFunc = handleClick ? () => handleClick(artistId) : () => {};

  return (
    <motion.div
      className="artist-orchestration-card"
      ref={ref}
      variants={artistOrchestrationVariant}
    >
      <AnimatePresence mode="wait">
        {!searched && (
          <motion.div
            variants={artistCardVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="artist-card"
            title="View artist profile"
            whileHover={{
              scale: [null, 1.1],
              y: [null, -5],
              transition: { duration: 0.1 },
            }}
            layout
          >
            <motion.div
              style={{
                transform,
                opacity,
                transition: `all 0.6s ${0.05 * index}s`,
              }}
              onClick={handleClickFunc}
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
                transform,
                opacity,
                transition: `all 0.6s ${0.03 * index}s`,
              }}
              onClick={handleClickFunc}
              className="header fs-5 text-center w-100 pt-2"
            >
              {artist?.name}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(ArtistListGridCard);
