import {
  AnimatePresence,
  MotionValue,
  type Variants,
  motion,
} from 'motion/react';
import { type ReactElement, memo, useEffect } from 'react';
import { useMediaQuery } from '../../../hooks/MediaQueryHook';
import '../styles/track-list.css';
import TrackListSelectedFrown from './TrackListSelectedFrown';
import TrackListSelectedSmile from './TrackListSelectedSmile';

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
  const is850 = useMediaQuery(850);

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
