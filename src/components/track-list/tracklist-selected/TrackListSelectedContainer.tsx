import { ReactElement, memo } from "react";
import {
  AnimatePresence,
  MotionValue,
  Variants,
  motion,
  useTransform,
} from "framer-motion";
import { TopTracksDetailsType } from "../../../types/types";
import TrackListSelectedTrack from "./TrackListSelectedTrack";
import TrackListSelectedNone from "./TrackListSelectedNone";
import "../styles/track-list.css";
import { HandleSelectedTrackType } from "../TrackList";
import { useMediaQuery, useScreenWidth } from "../../../hooks/MediaQueryHook";

const selectedContainerVariant: Variants = {
  initial: (is850) => ({
    opacity: 0,
    x: is850 ? 0 : -150,
    y: is850 ? 50 : 0,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: (is850) => ({
    opacity: 0,
    x: is850 ? 0 : -150,
    y: is850 ? 50 : 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  }),
};

const innerVariants: Variants = {
  normal: {
    background:
      "linear-gradient(45deg,rgb(0, 3, 79, 0.5) 20%,rgb(0, 0, 0) 50%,rgb(0, 3, 79, 0.5) 80%)",
    width: "250px",
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  },
  expanded: {
    width: "400px",
    background:
      "linear-gradient(45deg,rgb(6, 6, 6) 20%,rgb(0, 0, 0) 50%,rgb(10, 10, 10) 80%)",
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.3,
      background: {
        delay: 0.5,
      },
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
  const screenWidth = useScreenWidth();
  const is850 = useMediaQuery(850);

  const { ballX } = ballCoords;

  const farBG =
    "linear-gradient(45deg,rgb(0, 3, 79, 0.5) 20%,rgb(0, 0, 0) 50%,rgb(0, 3, 79, 0.5) 80%)";

  const closeBG =
    "linear-gradient(45deg,rgb(0, 0, 0) 20%,rgb(0, 3, 79) 50%,rgb(0, 0, 0) 80%)";

  const transformCoords = is850
    ? [0, screenWidth * 0.45, screenWidth * 0.46, screenWidth]
    : [ballX.get(), 180];

  const backgroundKeyframes = is850
    ? [farBG, closeBG, closeBG, farBG]
    : [farBG, closeBG];

  const background = useTransform(ballX, transformCoords, backgroundKeyframes);

  return (
    <motion.div
      variants={selectedContainerVariant}
      custom={is850}
      className="selected-container"
    >
      <motion.div
        variants={innerVariants}
        animate={expandCycle}
        style={{ background }}
        className={`selected-inner d-flex align-items-center flex-column ${
          selectedTrack ? "" : "justify-content-evenly"
        }`}
      >
        <AnimatePresence mode="wait">
          {selectedTrack ? (
            <TrackListSelectedTrack
              selectedTrack={selectedTrack}
              handleSelectedTrack={handleSelectedTrack}
            />
          ) : (
            <TrackListSelectedNone
              ballCoords={ballCoords}
              dragging={dragCycle}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default memo(TrackListSelectedContainer);
