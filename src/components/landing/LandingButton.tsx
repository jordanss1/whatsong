import React from "react";
import { Cycle, Variants, motion } from "framer-motion";

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
  hover: {
    scale: [null, 1.1],
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const LandingButton = ({ cycleMain }: { cycleMain: Cycle }) => {
  return (
    <div className="d-flex justify-content-center align-items-end">
      <motion.button
        layout
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        whileHover="hover"
        onMouseEnter={() => cycleMain(1)}
        onMouseLeave={() => cycleMain(0)}
        type="button"
        className="fs-4 rounded-pill p-3 px-4 start-button"
      >
        Start searching
      </motion.button>
    </div>
  );
};

export default LandingButton;
