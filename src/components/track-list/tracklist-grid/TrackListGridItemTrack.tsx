import { ReactElement } from "react";
import CircularImage from "../../CircularImage";
import TrackDetails from "../../TrackDetails";
import { motion, MotionStyle, Variants } from "framer-motion";
import { TopTracksDetailsType } from "../../../types/types";

type TrackListGridItemTrackPropsType = {
  isMobile: boolean;
  index: number;
  style: MotionStyle;
  track: Required<TopTracksDetailsType>;
};

const trackVariant: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 100,
    opacity: 0,
    transition: { duration: 0.1, delay: 0.1 * index },
  }),
};

const trackMobileVariant: Variants = {
  initial: {
    x: -50,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 50,
    opacity: 0,
    transition: { duration: 0.1, delay: 0.1 * index },
  }),
};

const TrackListGridItemTrack = ({
  isMobile,
  index,
  style,
  track,
}: TrackListGridItemTrackPropsType): ReactElement => {
  const image = track.album?.images?.[0]?.url;
  const artist = `${track.artists[0]?.name} - `;

  return (
    <motion.div
      layout
      variants={isMobile ? trackMobileVariant : trackVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      key={index}
      role="song-item"
      className="track-item-container w-100"
    >
      <motion.div
        style={style}
        className="track-item d-grid align-items-center p-3"
      >
        <CircularImage image={image} size={1} />
        <TrackDetails artist={artist} track={track.name} />
      </motion.div>
    </motion.div>
  );
};

export default TrackListGridItemTrack;
