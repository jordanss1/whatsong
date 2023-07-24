import { ReactElement, memo } from "react";
import { Variants, motion, MotionValue } from "framer-motion";

const containerVariants: Variants = {
  initial: {},
  animate: {},
};

const svgSmileVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: 40,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const borderSVGVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: -105,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const smileVariants: Variants = {
  initial: {
    pathLength: 0,
    scale: 1.3,
  },
  animate: {
    pathLength: 1,
    scale: 0.8,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    pathLength: 0,
    scale: 0.6,
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const borderVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    pathLength: 0,
    scale: 0,
    transition: {
      duration: 0.6,
    },
  },
};

type TrackListSelectedSmilePropsType = {
  ballCoords: { ballX: MotionValue<number>; ballY: MotionValue<number> };
};

const TrackListSelectedSmile = ({
  ballCoords,
}: TrackListSelectedSmilePropsType): ReactElement => {
  const { ballX, ballY } = ballCoords;

  ballX.on("change", () => {
    console.log(ballX.get());
  });

  return (
    <>
      <motion.svg
        variants={svgSmileVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        width="120px"
        height="120px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        layout
      >
        <motion.path
          layout
          initial="initial"
          animate="animate"
          exit="exit"
          variants={smileVariants}
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M15 9H15.01M8 9H10M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9Z"
          stroke="rgb(210, 210, 210, .4)"
          strokeWidth=".3"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        variants={borderSVGVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        width="170px"
        height="170px"
        fill="transparent"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="initial"
          animate="animate"
          exit="exit"
          variants={borderVariants}
          stroke="rgb(210, 210, 210, .4)"
          strokeWidth=".25"
          strokeDashoffset="117"
          strokeLinecap="round"
          strokeDasharray="3"
          d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"
        />
      </motion.svg>
    </>
  );
};

export default TrackListSelectedSmile;
