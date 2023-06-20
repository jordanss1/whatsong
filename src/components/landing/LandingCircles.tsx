import React from "react";
import { Variants, motion } from "framer-motion";

const circle1Variants: Variants = {
  spinning: {
    x: [0, 150, 0],
    y: [0, -70, 0, 70, 0],
    opacity: 0.5,
    transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 3,
    },
  },
};

const circle2Variants: Variants = {
  spinning: {
    x: [0, -150, 0],
    y: [0, 70, 0, -70, 0],
    opacity: 0.5,
    transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 3,
    },
  },
};

const LandingCircles = () => {
  return (
    <div className="circle-div d-flex w-100  justify-content-center">
      <motion.svg
        variants={circle1Variants}
        animate="spinning"
        className="circle-1"
        height="15"
        width="15"
      >
        <motion.circle cx="10" cy="10" r="3" stroke="white" fill="white" stroke-width="" />
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
          stroke-width="."
          fill="#de5aae"
        />
      </motion.svg>
    </div>
  );
};

export default LandingCircles;
