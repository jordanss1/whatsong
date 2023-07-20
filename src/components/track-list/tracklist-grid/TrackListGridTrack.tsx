import { memo, ReactElement, useRef } from "react";
import { TopTracksDetailsType } from "../../../types";
import { HandleSelectedTrackType } from "../TrackList";
import { Variants, motion, useInView } from "framer-motion";
import "../styles/track-list.css";
import CircularImage from "../../CircularImage";

const trackVariant: Variants = {
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

type PropTypes = {
  track: Required<TopTracksDetailsType>;
  hidden: boolean;
  handleSelectedTrack: HandleSelectedTrackType;
  index: number;
};

const TrackListGridTrack = ({
  track,
  hidden,
  handleSelectedTrack,
  index,
}: PropTypes): ReactElement => {
  const ref = useRef(null);
  const image = track.album?.images[2].url;
  const artist = `${track.artists[0]?.name} - `;

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  if (!index) index = 0;

  if (index > 20) index = index / 5;

  return (
    <motion.div
      variants={trackVariant}
      ref={ref}
      role="song-item"
      className="track-item-container w-100"
    >
      <motion.div
        style={{
          transform,
          opacity,
          transition: `all .4s ${0.02 * index}s`,
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
  );
};

export default memo(TrackListGridTrack);
