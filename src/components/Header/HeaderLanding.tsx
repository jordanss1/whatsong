import { ReactElement } from "react";
import { Variants, motion } from "framer-motion";

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
};

const HeaderLanding = (): ReactElement => {
  return (
    <motion.header
      variants={containerVarients}
      initial="initial"
      exit="exit"
      animate="animate"
      className="header-landing d-flex align-items-center justify-content-center px-4"
      data-testid="header-landing"
      layout
    >
      <motion.div
        className="header-container text-uppercase"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <motion.div animate="visible" variants={letterVariants}>
          w
        </motion.div>
        <motion.div
          variants={wordVariants}
          className="me-1 pt-2 extraText fs-5"
        >
          .hat
        </motion.div>
        <motion.div animate="visible" variants={letterVariants}>
          s
        </motion.div>
        <motion.div variants={wordVariants} className="ms-2 extraText fs-5">
          .ong
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default HeaderLanding;
