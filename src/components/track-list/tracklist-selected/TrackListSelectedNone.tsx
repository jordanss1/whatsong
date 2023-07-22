import { ReactElement } from "react";
import TrackListSelectedSmile from "./TrackListSelectedSmile";
import TrackListSelectedFrown from "./TrackListSelectedFrown";
import { AnimatePresence, Variants, motion } from "framer-motion";
import "../styles/track-list.css";

type TrackListSelectedNone = {
  dragging: boolean;
};

const instructionsVariant: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const TrackListSelectedNone = ({
  dragging,
}: TrackListSelectedNone): ReactElement => {
  return (
    <div className="no-selected-song">
      <motion.div className="face d-flex flex-column align-items-center">
        <AnimatePresence mode="wait">
          {!dragging && (
            <motion.p
              variants={instructionsVariant}
              key="drag"
              className="mb-0 pt-3 fw-bold w-100 text-center"
            >
              Drag songs here
            </motion.p>
          )}
          {dragging ? (
            <TrackListSelectedSmile key="smile" />
          ) : (
            <TrackListSelectedFrown key="frown" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TrackListSelectedNone;
