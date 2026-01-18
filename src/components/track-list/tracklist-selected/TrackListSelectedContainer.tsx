import {
  AnimatePresence,
  MotionValue,
  type Variants,
  motion,
  useMotionTemplate,
  useTransform,
} from 'motion/react';
import { type ReactElement, memo } from 'react';
import { useMediaQuery, useScreenSize } from '../../../hooks/MediaQueryHook';
import { type TopTracksDetailsType } from '../../../types/types';
import '../styles/track-list.css';
import { type HandleSelectedTrackType } from '../TrackList';
import TrackListSelectedNone from './TrackListSelectedNone';
import TrackListSelectedTrack from './TrackListSelectedTrack';

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
      when: 'beforeChildren',
    },
  },
  exit: (is850) => ({
    opacity: 0,
    x: is850 ? 0 : -150,
    y: is850 ? 50 : 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  }),
};

const expandedContainerVariants: Variants = {};

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
  const screenWidth = useScreenSize();
  const is850 = useMediaQuery(850);

  const { ballX } = ballCoords;

  const containerClass =
    is850 && dragCycle
      ? '-normal'
      : is850 && expandCycle === 'expanded'
        ? '-expanded'
        : '';

  const farBG =
    'linear-gradient(45deg,rgb(0, 3, 79, 0.5) 20%,rgb(0, 0, 0) 50%,rgb(0, 3, 79, 0.5) 80%)';

  const closeBG =
    'linear-gradient(45deg,rgb(0, 0, 0) 20%,rgb(0, 3, 79) 50%,rgb(0, 0, 0) 80%)';

  const transformCoords = is850
    ? [0, screenWidth * 0.45, screenWidth * 0.46, screenWidth]
    : [ballX.get(), 180];

  const backgroundKeyframes = is850
    ? [farBG, closeBG, closeBG, farBG]
    : [farBG, closeBG];

  const background = useTransform(ballX, transformCoords, backgroundKeyframes);

  const borderTop = useTransform(
    ballX,
    transformCoords,
    is850 ? [0, 0.5, 0.5, 0] : [0, 0]
  );

  const innerVariants: Variants = {
    normal: {
      background:
        'linear-gradient(45deg,rgb(0, 3, 79, 0.5) 20%,rgb(0, 0, 0) 50%,rgb(0, 3, 79, 0.5) 80%)',
      width: is850 ? '100%' : '250px',
      boxShadow: is850
        ? '0px 0px 0px 0px rgb(255,255,255, 0.4)'
        : '0px 0px 0px 0px white, 1px 10px 12px 0px rgb(255,255,255, 0)',
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut',
        width: { delay: 0.5 },
        height: { delay: dragCycle ? 0 : 0.8 },
        background: {
          type: 'spring',
          delay: 0.5,
          duration: 1,
        },
      },
    },
    expanded: {
      width: is850 ? '100%' : '400px',
      background: is850
        ? 'linear-gradient(45deg,rgb(6, 6, 6) 20%,rgb(0, 0, 0) 50%,rgb(10, 10, 10) 80%)'
        : 'linear-gradient(to right, rgb(0, 0, 0) 20%, rgb(10, 10, 10) 50%, rgb(16, 16, 16) 80%)',
      boxShadow: is850
        ? '0px 0px 30px 10px rgb(255,255,255, 0.4)'
        : '0px 0px 0px 0px white, 0px 20px 30px 5px rgb(255,255,255, 0.4)',
      transition: {
        type: 'tween',
        duration: 1,
        ease: 'easeInOut',
        background: {
          type: 'spring',
          delay: 0.5,
          duration: 1,
        },
      },
    },
    exit: is850
      ? {}
      : {
          opacity: 0,
          transition: {
            type: 'tween',
            duration: 0.5,
            delay: 0.5,
            ease: 'easeInOut',
          },
        },
  };

  return (
    <motion.div
      variants={selectedContainerVariant}
      custom={is850}
      className={`selected-container${containerClass}`}
    >
      <motion.div
        variants={innerVariants}
        animate={expandCycle}
        style={{
          background,
          borderTop: useMotionTemplate`1px solid rgba(210,210,210, ${borderTop})`,
        }}
        exit={innerVariants.exit}
        layout
        className={`selected-inner d-flex align-items-center flex-column ${
          selectedTrack ? '' : 'justify-content-evenly'
        }`}
      >
        <AnimatePresence mode="wait">
          {selectedTrack ? (
            <TrackListSelectedTrack
              key="selected"
              selectedTrack={selectedTrack}
              handleSelectedTrack={handleSelectedTrack}
            />
          ) : (
            <TrackListSelectedNone
              key="none"
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
