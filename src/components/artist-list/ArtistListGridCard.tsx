import { ReactElement, memo, useRef } from "react";
import { Variants, motion, useInView, AnimatePresence } from "framer-motion";
import { ArtistsType } from "../../types/types";
import { HandleProfileClickType } from "./ArtistListGrid";
import "./styles/artist-list.css";
import ImageCard from "../ImageCard";
import ImageHeader from "../ImageHeader";
import { useMediaQuery } from "../../hooks/MediaQueryHook";

type ArtistListGridCardPropType = {
  artist: ArtistsType;
  handleClick: HandleProfileClickType;
  index: number;
  searched: boolean;
};

const artistCardVariant: Variants = {
  initial: {
    x: -75,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 75,
    opacity: 0,
    transition: { duration: 0.1, delay: 0.05 * index },
  }),
};

const artistCardMobileVariant: Variants = {
  initial: {
    x: -35,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 35,
    opacity: 0,
    transition: { duration: 0.2, delay: 0.05 * index },
  }),
};

const artistOrchestrationVariant: Variants = {
  initial: (isMobile) => ({
    x: isMobile ? -35 : -75,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: (isMobile) => ({
    x: isMobile ? -35 : 75,
    opacity: 0,
    transition: { duration: 0.05 },
  }),
};

const ArtistListGridCard = ({
  artist,
  handleClick,
  index,
  searched,
}: ArtistListGridCardPropType): ReactElement => {
  const isMobile = useMediaQuery(480);
  const ref = useRef(null);
  let modifiedIndex = 0;
  const image = artist?.images?.[0]?.url;

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  if (!index) modifiedIndex = 0;

  if (index % 0) modifiedIndex = 0;
  if (index % 1) modifiedIndex = 1;
  if (index % 2) modifiedIndex = 2;
  if (index % 3) modifiedIndex = 3;
  if (index % 4) modifiedIndex = 4;
  if (index % 5) modifiedIndex = 5;

  let transform = isInView ? "translateX(0)" : "translateX(-75px)";
  let opacity = isInView ? 1 : 0;

  return (
    <motion.div
      className="artist-orchestration-card"
      ref={ref}
      custom={isMobile}
      variants={artistOrchestrationVariant}
      layout
    >
      <AnimatePresence mode="wait">
        {!searched && (
          <motion.div
            variants={isMobile ? artistCardMobileVariant : artistCardVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            key={index}
            custom={index}
            className="artist-card"
            title="View artist profile"
            layout
            whileHover={{
              scale: [null, 1.1],
              y: [null, -5],
              transition: { duration: 0.1 },
            }}
          >
            <ImageCard
              motionStyle={{
                transform,
                opacity,
                transition: `all 0.6s ${0.05 * modifiedIndex}s`,
              }}
              url={image}
              iconSize={76}
              onClick={() => handleClick(artist.id)}
            />
            <ImageHeader
              motionStyle={{
                transform,
                opacity,
                transition: `all 0.6s ${0.03 * modifiedIndex}s`,
              }}
              text={artist?.name}
              onClick={() => handleClick(artist.id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(ArtistListGridCard);
