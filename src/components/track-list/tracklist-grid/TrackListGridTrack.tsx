import { memo, MutableRefObject, ReactElement, useRef, useState } from "react";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleSelectedTrackType } from "../TrackList";
import {
  Variants,
  motion,
  useInView,
  AnimatePresence,
  useCycle,
} from "framer-motion";
import CircularImage from "../../CircularImage";
import DraggableBall from "../../DraggableBall";
import TrackDetails from "../../TrackDetails";
import { useMediaQuery } from "../../../hooks/MediaQueryHook";
import "../styles/track-list.css";

const trackOrchestratedVariant: Variants = {
  initial: (isMobile) => ({
    x: isMobile ? -50 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (isMobile) => ({
    x: isMobile ? 50 : -100,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
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

const dragBallVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: [0.95, 1.3, 1.6, 0.95],
    borderRadius: ["50%", "20%", "20%", "50%"],
    boxShadow: [
      "0px 0px 0px 0px rgba(222, 90, 174)",
      "0px 0px 5px 2px rgba(222, 90, 174)",
      "0px 0px 5px 2px rgba(222, 90, 174)",
      "0px 0px 0px 0px rgba(222, 90, 174)",
    ],
    rotate: [0, 720, 0, 720],
    transition: {
      duration: 0.7,
      stiffness: 200,
      borderRadius: {
        repeat: Infinity,
        repeatDelay: 1,
        duration: 4,
        times: [0, 0.25, 0.75, 1],
      },
      scale: {
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.25, 0.75, 1],
        duration: 4,
      },
      boxShadow: {
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.25, 0.75, 1],
        duration: 4,
      },
      rotate: {
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.25, 0.75, 1],
        duration: 4,
      },
    },
  },
  whileTap: {
    borderRadius: "50%",
    boxShadow: [null, "0px 0px 5px 3px rgba(222, 90, 174)"],
    scale: [null, 1.5],
    backgroundColor: "rgba(255,255,255)",
    rotate: [null, 0],
    transition: {
      duration: 0.3,
    },
  },
};

type PropTypes = {
  track: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
  index: number;
  searched: boolean;
  dragRef: MutableRefObject<null>;
};

type HandleDragType = (e: MouseEvent | TouchEvent | PointerEvent) => void;

const TrackListGridTrack = ({
  track,
  handleSelectedTrack,
  index,
  searched,
  dragRef,
}: PropTypes): ReactElement => {
  const ref = useRef(null);
  const isMobile = useMediaQuery(480);
  const [ballCycle, cycleBall] = useCycle("hidden", "visible", "drag");
  const [x, setX] = useState(0);

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  let modifiedIndex = 0;
  const image = track.album?.images?.[0]?.url;
  const artist = `${x} - `;

  if (!index) modifiedIndex = 0;

  if (index > 20) modifiedIndex = index / 5;

  const handleDrag: HandleDragType = (e) => {
    e.preventDefault();
    e = e as MouseEvent;
    setX(e.clientX);
    console.log(e.clientX);
    cycleBall(1);
  };

  return (
    <motion.div
      className="track-item-orchestrated d-flex align-items-center gap-5 ps-3"
      variants={trackOrchestratedVariant}
      custom={isMobile}
      onMouseEnter={() => cycleBall(1)}
      onMouseLeave={() => cycleBall(0)}
      ref={ref}
    >
      <DraggableBall
        drag
        dragSnapToOrigin
        dragConstraints={dragRef}
        onDrag={(e) => handleDrag(e)}
        variants={dragBallVariant}
        animate={ballCycle}
        style={{ zIndex: 5 }}
        whileTap="whileTap"
        className="drag-ball"
      />
      <AnimatePresence>
        {!searched && (
          <motion.div
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
              style={{
                transform,
                opacity,
                transition: `all .4s ${0.02 * modifiedIndex}s`,
              }}
              className="track-item d-grid align-items-center p-3"
            >
              <CircularImage image={image} size={1} />
              <TrackDetails artist={artist} track={track.name} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(TrackListGridTrack);
