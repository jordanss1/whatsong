import React, { useEffect } from "react";
import { MotionValue, Variants, motion } from "framer-motion";

const containerVarients: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: -300,
    transition: {
      duration: 1,
      delay: 1.3,
    },
  },
};

const boxVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      when: "beforeChildren",
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    scale: 0.7,
    x: 0,
    opacity: 0,
    transition: {
      duration: 1.5,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
    y: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: (isW) => ({
    scale: 0.7,
    x: isW ? -37 : -87,
    y: 5,
    color: isW ? "white" : "#de5aae",
    transition: {
      duration: 1,
      delay: 0.5,
    },
  }),
};

const HeaderLanding = () => {
  return (
    <motion.header
      variants={containerVarients}
      initial="initial"
      exit="exit"
      animate="animate"
      className="header-landing d-flex align-items-center justify-content-center px-4"
      layout
    >
      <motion.div
        style={{ gridRow: 1, gridColumn: 1 }}
        className="header-container text-uppercase"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <motion.div
          custom={true}
          exit="exit"
          animate="visible"
          variants={letterVariants}
        >
          w
        </motion.div>
        <motion.div
          exit="exit"
          variants={wordVariants}
          className="me-1 pt-2 extraText fs-5"
        >
          .hat
        </motion.div>
        <motion.div
          custom={false}
          exit="exit"
          animate="visible"
          variants={letterVariants}
        >
          s
        </motion.div>
        <motion.div
          exit="exit"
          variants={wordVariants}
          className="ms-2 extraText fs-5"
        >
          .ong
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default HeaderLanding;
