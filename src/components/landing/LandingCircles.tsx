import React from "react";
import { MotionValue, Variants, motion } from "framer-motion";

const circle1Variants: Variants = {
  spinning: {
    x: [50, 0, 50],
    y: [0, -50, 0, 50, 0],
    opacity: [0, 0, 1, 1, 0],
    transition: {
      repeat: Infinity,
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
      ease: "easeInOut",
      duration: 3,
    },
  },
};

const LandingCircles = ({ x }: { x: MotionValue<number> }) => {
  return (
    <div className="circle-div d-flex justify-content-center">
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
          r="3"
          stroke="white"
          fill="white"
          stroke-width=""
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
          r="3"
          stroke="white"
          stroke-width=""
          fill="white"
        />
      </motion.svg>
    </div>
  );
};

export default LandingCircles;
