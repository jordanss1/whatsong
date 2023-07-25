import { ReactElement, MutableRefObject, memo } from "react";
import { motion, Variants } from "framer-motion";
import DraggableBall from "../../DraggableBall";
import { useMediaQuery } from "../../../hooks/MediaQueryHook";

type TrackListGridBallPropsType = {
  ballCycle: string;
  dragRef: MutableRefObject<null>;
  onDrag: (e: React.PointerEvent, end?: boolean) => void;
  pointerFunction: (pointer: boolean) => void;
  expandCycle: string;
};

const dragBallVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
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
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
  whileTap: (is850) => ({
    borderRadius: "50%",
    boxShadow: [null, "0px 0px 5px 3px rgba(222, 90, 174)"],
    scale: [null, is850 ? 3 : 1.5],
    backgroundColor: "rgba(255,255,255)",
    rotate: [null, 0],
    transition: {
      duration: 0.3,
    },
  }),
};

const TrackListGridBall = ({
  ballCycle,
  onDrag,
  dragRef,
  pointerFunction,
  expandCycle,
}: TrackListGridBallPropsType): ReactElement => {
  const is850 = useMediaQuery(850);

  const renderBall = (
    <DraggableBall
      drag
      custom={is850}
      onPointerDown={() => pointerFunction(true)}
      onPointerUp={(e) => {
        pointerFunction(false);
        onDrag(e, true);
      }}
      onPointerMove={(e) => onDrag(e)}
      dragSnapToOrigin
      dragConstraints={dragRef}
      dragPropagation={true}
      dragElastic={0.7}
      variants={dragBallVariant}
      dragMomentum={false}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileTap="whileTap"
      style={{ zIndex: 4 }}
      invisibleClass="invisible-inner-ball"
      className="drag-ball"
    />
  );

  if (is850) {
    return <>{ballCycle === "hidden" ? <></> : renderBall}</>;
  } else {
    return (
      <>
        {expandCycle === "normal" &&
        (ballCycle === "visible" || ballCycle === "drag") ? (
          renderBall
        ) : (
          <motion.div style={{ width: "17px", zIndex: 3 }} />
        )}
      </>
    );
  }
};

export default memo(TrackListGridBall);
