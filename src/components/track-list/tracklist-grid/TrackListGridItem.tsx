import {
  MutableRefObject,
  ReactElement,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleDragType } from "../TrackList";
import {
  Variants,
  motion,
  useInView,
  AnimatePresence,
  useCycle,
  MotionStyle,
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
  index: number;
  searched: boolean;
  dragRef: MutableRefObject<null>;
  expandCycle: string;
  handleDrag?: HandleDragType;
  style?: MotionStyle;
};

const TrackListGridItem = ({
  track,
  index,
  searched,
  dragRef,
  handleDrag,
  expandCycle,
  style,
}: TrackListGridItemPropTypes): ReactElement => {
  const ref = useRef(null);
  const pointerRef = useRef(false);

  const isMobile = useMediaQuery(480);
  const is850 = useMediaQuery(850);

  const [ballCycle, cycleBall] = useCycle("hidden", "visible", "drag");

  const isInView = useInView(ref, {
    amount: 0.2,
  });

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  let modifiedIndex = 0;

  if (!index) modifiedIndex = 0;

  if (index > 20) modifiedIndex = index / 5;

  useEffect(() => {
    const visited = sessionStorage.getItem("tracks-visited");

    if (!visited) cycleBall(0);
  }, []);

  useEffect(() => {
    if (track) cycleBall(0);
  }, [track]);
  const handleDragged = useCallback((e: React.PointerEvent, end?: boolean) => {
    if (handleDrag) {
      if (end) {
        handleDrag(e, cycleBall, pointerRef, true, track);
        return;
      }

      handleDrag(e, cycleBall, pointerRef);
    }
  }, []);

  const handleMouseEvent = (enter?: boolean) => {
    if (enter && ballCycle !== "drag" && ballCycle === "hidden") {
      cycleBall(1);
      return;
    }

    if (
      ballCycle !== "drag" &&
      ballCycle === "visible" &&
      !pointerRef.current
    ) {
      cycleBall(0);
    }
  };

  const pointerFunction = (pointer: boolean) => {
    pointerRef.current = pointer;
  };

  return (
    <motion.div
      className="track-item-orchestrated d-flex align-items-center gap-5 ps-3"
      variants={trackOrchestratedVariant}
      custom={isMobile}
      onMouseEnter={is850 ? () => {} : () => handleMouseEvent(true)}
      onMouseLeave={is850 ? () => {} : () => handleMouseEvent()}
      onClick={
        is850 ? () => cycleBall(ballCycle === "hidden" ? 1 : 0) : () => {}
      }
      layout
      style={style}
      ref={ref}
    >
      <AnimatePresence mode="wait">
        <TrackListGridBall
          onDrag={handleDragged}
          dragRef={dragRef}
          ballCycle={ballCycle}
          pointerFunction={pointerFunction}
          expandCycle={expandCycle}
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
