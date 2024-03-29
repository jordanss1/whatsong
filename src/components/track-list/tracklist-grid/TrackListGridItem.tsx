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

  const gridTemplateColumns =
    is850 && ballCycle !== "hidden" ? "0px auto" : "auto";

  let transform = isInView ? "translateX(0)" : "translateX(-100px)";
  let opacity = isInView ? 1 : 0;

  let modifiedIndex = 0;

  if (!index) modifiedIndex = 0;

  if (index < 30) modifiedIndex = index * 0.01;
  if (index > 30) modifiedIndex = index * 0.005;

  useEffect(() => {
    const visited = localStorage.getItem("tracks-visited");

    if (!visited) cycleBall(0);
  }, []);

  useEffect(() => {
    if (track) {
      cycleBall(0);
    }
  }, [track.id]);

  const handleDragged = useCallback(
    (e: React.PointerEvent, end?: boolean) => {
      if (handleDrag) {
        if (end) {
          handleDrag(e, cycleBall, pointerRef, true, track);
          return;
        }

        handleDrag(e, cycleBall, pointerRef);
      }
    },
    [track.id]
  );

  const handleMouseEvent = (enter?: boolean) => {
    if (enter && ballCycle !== "drag" && ballCycle === "hidden" && !is850) {
      cycleBall(1);
      return;
    }

    if (
      ballCycle !== "drag" &&
      ballCycle === "visible" &&
      !pointerRef.current &&
      !is850
    ) {
      cycleBall(0);
    }
  };

  const pointerFunction = (pointer: boolean) => {
    pointerRef.current = pointer;
  };

  return (
    <motion.div
      className="track-item-orchestrated ps-3"
      variants={trackOrchestratedVariant}
      custom={isMobile}
      onMouseEnter={() => handleMouseEvent(true)}
      onMouseLeave={() => handleMouseEvent()}
      onClick={() => cycleBall(ballCycle === "hidden" ? 1 : 0)}
      style={{ ...style, gridTemplateColumns }}
      ref={ref}
      data-testid={`track-item-${index}`}
    >
      <AnimatePresence mode="wait">
        <TrackListGridBall
          onDrag={handleDragged}
          dragRef={dragRef}
          ballCycle={ballCycle}
          pointerFunction={pointerFunction}
          expandCycle={expandCycle}
          index={index}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!searched && (
          <TrackListGridItemTrack
            style={{
              opacity,
              transform,
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
