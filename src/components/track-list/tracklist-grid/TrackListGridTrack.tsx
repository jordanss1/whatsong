import { memo, ReactElement, useRef } from "react";
import { TopTracksDetailsType } from "../../../types";
import { HandleSelectedTrackType } from "../TrackList";
import { Variants, motion, useInView, AnimatePresence } from "framer-motion";
import CircularImage from "../../CircularImage";
import "../styles/track-list.css";

const trackOrchestratedVariant = {
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

type PropTypes = {
  track: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
  index: number;
  searched: boolean;
};

const TrackListGridTrack = ({
  track,
  handleSelectedTrack,
  index,
  searched,
}: PropTypes): ReactElement => {
  const ref = useRef(null);

  let modifiedIndex = 0;
  const image = track.album?.images[2].url;
  const artist = `${track.artists[0]?.name} - `;

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  if (!index) modifiedIndex = 0;

  if (index > 20) modifiedIndex = index / 5;

  return (
    <motion.div
      className="track-item-orchestrated"
      variants={trackOrchestratedVariant}
      ref={ref}
    >
      <AnimatePresence mode="wait">
        {!searched && (
          <motion.div
            variants={trackVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={index}
            key={index}
            role="song-item"
            className="track-item-container w-100"
          >
            <motion.div
              style={{
                transform,
                opacity,
                transition: `all .4s ${0.02 * modifiedIndex}s`,
              }}
              className="track-item d-grid align-items-center p-3"
            >
              <CircularImage image={image} size={1} />
              <div className="content">
                <span className="fs-2 fw-bold">{artist}</span>
                <span className="fs-3">{track.name}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(TrackListGridTrack);
