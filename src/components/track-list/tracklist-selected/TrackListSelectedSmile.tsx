import { ReactElement, memo } from "react";
import {
  Variants,
  motion,
  MotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useMediaQuery, useScreenSize } from "../../../hooks/MediaQueryHook";

const svgSmileVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: (is850) => ({
    y: is850 ? 20 : 40,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
    },
  }),
  exit: {
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const borderSVGVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: (is850) => ({
    y: is850 ? -150 : -130,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
    },
  }),
  exit: {
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const smileVariants: Variants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const borderVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
    },
  },
  exit: {
    pathLength: 0,
    scale: 0,
    transition: {
      duration: 0.1,
    },
  },
};

type TrackListSelectedSmilePropsType = {
  ballCoords: { ballX: MotionValue<number>; ballY: MotionValue<number> };
};

const TrackListSelectedSmile = ({
  ballCoords,
}: TrackListSelectedSmilePropsType): ReactElement => {
  const screenWidth = useScreenSize();
  const is850 = useMediaQuery(850);

  const { ballX, ballY } = ballCoords;

  const transformYCoords = is850 ? [0, 600] : [675, 420, 230, 80];
  const smileScaleYIncrement = is850 ? [0.3, 0.4] : [0.3, 0.4, 0.4, 0.3];

  const transformXCoords = is850
    ? [0, screenWidth * 0.45, screenWidth * 0.46, screenWidth]
    : [ballX.get(), 180];
  const smileScaleXIncrement = is850 ? [0.3, 0.4, 0.4, 0.3] : [0.3, 0.4];

  const smileScaleY = useTransform(
    ballY,
    transformYCoords,
    smileScaleYIncrement
  );
  const smileScaleX = useTransform(
    ballX,
    transformXCoords,
    smileScaleXIncrement
  );

  const smileScale = useTransform(smileScaleX, (x) => x + smileScaleY.get());

  const borderStrokeOpacity = useTransform(smileScale, [0.6, 0.8], [1, 0.3]);
  const borderScale = useTransform(smileScale, [0.6, 0.8], [0.8, 1.1]);
  const borderStrokeWidth = useTransform(smileScale, [0.6, 0.8], [0.5, 0.2]);
  const borderDashOffset = useTransform(smileScale, [0.6, 0.8], [117, 50]);

  const smileOpacity = useTransform(smileScale, [0.8, 0.6], [1, 0.3]);
  const smileStrokeWidth = useTransform(smileScale, [0.6, 0.8], [0.1, 1]);

  return (
    <>
      <motion.svg
        variants={svgSmileVariants}
        custom={is850}
        initial="initial"
        animate="animate"
        exit="exit"
        width="120px"
        height="120px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            scale: smileScale,
          }}
          variants={smileVariants}
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M15 9H15.01M8 9H10M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9Z"
          stroke={useMotionTemplate`rgb(255, 255, 255, ${smileOpacity})`}
          strokeWidth={smileStrokeWidth}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        variants={borderSVGVariants}
        custom={is850}
        initial="initial"
        animate="animate"
        exit="exit"
        width="229px"
        height="229px"
        fill="transparent"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          style={{ scale: borderScale }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={borderVariants}
          stroke="rgb(250, 250, 250)"
          strokeWidth={borderStrokeWidth}
          strokeDashoffset={borderDashOffset}
          strokeLinecap="round"
          strokeDasharray="3"
          strokeOpacity={borderStrokeOpacity}
          d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"
        />
      </motion.svg>
    </>
  );
};

export default memo(TrackListSelectedSmile);
