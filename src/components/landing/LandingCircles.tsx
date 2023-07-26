import React, { CSSProperties } from "react";
import { MotionStyle, MotionValue, Variants, motion } from "framer-motion";
import { Style } from "util";

const circle1Variants: Variants = {
  spinning: {
    x: [50, 0, 50],
    y: [0, -50, 0, 50, 0],
    opacity: [0, 0, 1, 1, 0],
    transition: {
      repeat: Infinity,
      type: "tween",
      ease: "easeInOut",
      duration: 3,
    },
  },
};

const circle2Variants: Variants = {
  spinning: {
    x: [-50, 0, -50],
    y: [0, 50, 0, -50, 0],
    opacity: [0, 0, 1, 1, 0],
    transition: {
      repeat: Infinity,
      type: "tween",
      ease: "easeInOut",
      duration: 3,
    },
  },
};

const LandingCircles = ({
  x,
  containerStyle,
}: {
  x: MotionValue<number>;
  containerStyle?: CSSProperties;
}) => {
  const radius = containerStyle ? 2 : 3;
  return (
    <div
      style={containerStyle}
      className="circle-div d-flex justify-content-center"
    >
      <motion.svg
        style={{ x }}
        variants={circle1Variants}
        animate="spinning"
        className="circle-1"
        height="15"
        width="15"
      >
        <motion.circle
          cx="10"
          cy="10"
          r={radius}
          stroke="white"
          fill="white"
          strokeWidth=""
        />
      </motion.svg>
      <motion.svg
        variants={circle2Variants}
        animate="spinning"
        className="circle-2"
        height="15"
        width="15"
      >
        <motion.circle
          cx="10"
          cy="10"
          r={radius}
          stroke="white"
          strokeWidth=""
          fill="white"
        />
      </motion.svg>
    </div>
  );
};

export default LandingCircles;
