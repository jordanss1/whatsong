import { ReactElement, memo, useEffect } from "react";
import TrackListSelectedSmile from "./TrackListSelectedSmile";
import TrackListSelectedFrown from "./TrackListSelectedFrown";
import { AnimatePresence, Variants, motion, MotionValue } from "framer-motion";
import "../styles/track-list.css";

type TrackListSelectedNone = {
  dragging: boolean;
  ballCoords: { ballX: MotionValue<number>; ballY: MotionValue<number> };
};

const dragLandingVariants: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: (dragged) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  }),
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const TrackListSelectedNone = ({
  dragging,
  ballCoords,
}: TrackListSelectedNone): ReactElement => {
  useEffect(() => {
    if (dragging) {
      console.log("dragged");
    } else {
      console.log("dragged done");
    }
  }, [dragging]);

  return (
    <motion.div className="no-selected-song">
      <motion.div className="drag-container d-flex flex-column align-items-center">
        <AnimatePresence presenceAffectsLayout mode="wait">
          {dragging ? (
            <TrackListSelectedSmile ballCoords={ballCoords} key="smile" />
          ) : (
            <TrackListSelectedFrown key="frown" />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default memo(TrackListSelectedNone);
