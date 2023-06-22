import React from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

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

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const HeaderLanding = ({ headerCycle }: { headerCycle: string }) => {
  return (
    <motion.div variants={boxVariants} initial="hidden" animate="visible">
      <motion.span
        custom={false}
        animate={headerCycle}
        variants={letterVariants}
      >
        w
      </motion.span>
      <motion.span
        custom={true}
        variants={letterVariants}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
          },
        }}
        className="me-1 pt-2 extraText fs-5"
      >
        .hat
      </motion.span>
      <motion.span
        animate={headerCycle}
        custom={false}
        variants={letterVariants}
      >
        s
      </motion.span>
      <motion.span
        custom={true}
        variants={letterVariants}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
          },
        }}
        className="ms-2 extraText fs-5"
      >
        .ong
      </motion.span>
    </motion.div>
  );
};

export default HeaderLanding;
