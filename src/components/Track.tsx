import { ReactElement } from "react";
import { MotionStyle, motion } from "framer-motion";
import "../styles/all.css";

type TrackPropsType = {
  artist: string;
  track: string;
  motionStyle?: MotionStyle;
  artistSize?: number;
  trackSize?: number;
};

const Track = ({
  artist,
  track,
  motionStyle,
  artistSize,
  trackSize,
}: TrackPropsType): ReactElement => {
  artistSize = artistSize ?? 2;
  trackSize = trackSize ?? 3;

  return (
    <motion.div style={motionStyle} className="track-details">
      <span className={`fs-${artistSize} fw-bold artist`}>{artist}</span>
      <span className={`fs-${trackSize} track`}>{track}</span>
    </motion.div>
  );
};

export default Track;
