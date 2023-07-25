import { ReactElement, memo } from "react";
import { MotionValue, Variants, motion } from "framer-motion";
import { TopTracksDetailsType } from "../../../types/types";
import TrackListSelectedTrack from "./TrackListSelectedTrack";
import TrackListSelectedNone from "./TrackListSelectedNone";
import "../styles/track-list.css";
import { HandleSelectedTrackType } from "../TrackList";

const selectedContainerVariant: Variants = {
  initial: {
    opacity: 0,
    x: -150,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    x: -150,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const innerVariants: Variants = {
  normal: {
    width: "250px",
    background:
      "linear-gradient(45deg,rgb(0, 3, 79, 0.5) 20%,rgb(0, 0, 0) 50%,rgb(0, 3, 79, 0.5) 80%)",
    transition: {
      type: "spring",
      duration: 2,
      stiffness: 130,
    },
  },
  expanded: {
    width: "320px",
    background:
      "linear-gradient(45deg,rgb(0, 0, 0) 20%,rgb(0, 3, 79, .8) 50%,rgb(0, 0, 0) 80%)",
    transition: {
      type: "spring",
      duration: 2,
      stiffness: 130,
    },
  },
};

type TrackListSelectedProps = {
  selectedTrack: Required<TopTracksDetailsType> | null;
  handleSelectedTrack: HandleSelectedTrackType;
  dragCycle: boolean;
  ballCoords: { ballX: MotionValue<number>; ballY: MotionValue<number> };
  expandCycle: string;
};

const TrackListSelectedContainer = ({
  selectedTrack,
  handleSelectedTrack,
  dragCycle,
  ballCoords,
  expandCycle,
}: TrackListSelectedProps): ReactElement => {
  return (
    <motion.div
      variants={selectedContainerVariant}
      className="selected-container"
    >
      <motion.div
        variants={innerVariants}
        animate={expandCycle}
        className={`selected-inner d-flex align-items-center flex-column justify-content-evenly`}
      >
        {selectedTrack ? (
          <TrackListSelectedTrack
            selectedTrack={selectedTrack}
            handleSelectedTrack={handleSelectedTrack}
          />
        ) : (
          <TrackListSelectedNone ballCoords={ballCoords} dragging={dragCycle} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default memo(TrackListSelectedContainer);
