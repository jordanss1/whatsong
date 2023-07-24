import { MutableRefObject, ReactElement, useRef } from "react";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleDragType, HandleSelectedTrackType } from "../TrackList";
import {
  Variants,
  motion,
  useInView,
  AnimatePresence,
  useCycle,
  useMotionValue,
  PanInfo,
} from "framer-motion";
import TrackListGridItemTrack from "./TrackListGridItemTrack";
import TrackListGridBall from "./TrackListGridBall";
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

type TrackListGridItemPropTypes = {
  track: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
  index: number;
  searched: boolean;
  dragRef: MutableRefObject<null>;
  handleDrag: HandleDragType;
};

const TrackListGridItem = ({
  track,
  handleSelectedTrack,
  index,
  searched,
  dragRef,
  handleDrag,
}: TrackListGridItemPropTypes): ReactElement => {
  const ref = useRef(null);
  const pointerRef = useRef(false);
  const isMobile = useMediaQuery(480);
  const [ballCycle, cycleBall] = useCycle(
    "hidden",
    "visible",
    "drag",
    "finished"
  );

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  let modifiedIndex = 0;

  if (!index) modifiedIndex = 0;

  if (index > 20) modifiedIndex = index / 5;

  const handleDragged = (e: React.PointerEvent, end?: boolean) => {
    if (end) {
      handleDrag(e, cycleBall, pointerRef, true);
      return;
    }

    handleDrag(e, cycleBall, pointerRef);
  };

  const pointerFunction = (pointer: boolean) => {
    pointerRef.current = pointer;
  };

  return (
    <motion.div
      className="track-item-orchestrated d-flex align-items-center gap-5 ps-3"
      variants={trackOrchestratedVariant}
      custom={isMobile}
      onMouseEnter={() => {
        if (ballCycle !== "drag" && ballCycle === "hidden") cycleBall(1);
      }}
      onMouseLeave={() => {
        if (ballCycle !== "drag" && ballCycle === "visible") cycleBall(0);
      }}
      layout
      ref={ref}
    >
      <AnimatePresence mode="wait">
        <TrackListGridBall
          onDrag={handleDragged}
          dragRef={dragRef}
          ballCycle={ballCycle}
          pointerFunction={pointerFunction}
        />
      </AnimatePresence>
      <AnimatePresence>
        {!searched && (
          <TrackListGridItemTrack
            style={{
              transform,
              opacity,
              transition: `all .4s ${modifiedIndex}s`,
            }}
            track={track}
            index={index}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackListGridItem;
