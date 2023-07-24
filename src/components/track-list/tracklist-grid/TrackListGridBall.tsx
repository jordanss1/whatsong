import { ReactElement, MutableRefObject } from "react";
import { motion, PanInfo, Variants } from "framer-motion";
import DraggableBall from "../../DraggableBall";

type TrackListGridBallPropsType = {
  ballCycle: string;
  dragRef: MutableRefObject<null>;
  onDrag: (i: PanInfo, end?: boolean) => void;
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

const TrackListGridBall = ({
  ballCycle,
  onDrag,
  dragRef,
}: TrackListGridBallPropsType): ReactElement => {
  return (
    <>
      {ballCycle === "visible" || ballCycle === "drag" ? (
        <DraggableBall
          drag
          onDrag={(e, i) => onDrag(i)}
          onDragEnd={(e, i) => onDrag(i, true)}
          dragSnapToOrigin
          dragConstraints={dragRef}
          dragPropagation={true}
          dragElastic={0.7}
          onDragTransitionEnd={() => console.log("first")}
          variants={dragBallVariant}
          dragMomentum={false}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileTap="whileTap"
          style={{ zIndex: 3 }}
          invisibleClass="invisible-inner-ball"
          className="drag-ball"
        />
      ) : (
        <motion.div style={{ width: "17px", zIndex: 3 }} />
      )}
    </>
  );
};

export default TrackListGridBall;
