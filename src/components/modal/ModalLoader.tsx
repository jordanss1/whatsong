import { ReactElement } from "react";
import { Variants, motion } from "framer-motion";

const containerVariant: Variants = {
  spin: {
    rotateY: 360,
    transition: {
      repeat: Infinity,
      type: "spring",
      duration: 1,
      delay: 0.2,
    },
  },
  // exit: {
  //   // rotateY: [null, 360],
  //   // rotateX: 360,
  //   x: 100,
  //   transition: {
  //     duration: 1,
  //     rotateY: {
  //       duration: 0.5,
  //     },
  //     x: {
  //       delay: 0.5,
  //       duration: 0.5,
  //     },
  //     rotateX: {
  //       delay: 0.5,
  //       duration: 0.5,
  //     },
  //   },
  // },
};

const loaderVariant: Variants = {
  animate: {
    boxShadow: [
      "0px 0px 5px 2px rgba(255, 255, 255, 0)",
      "0px 0px 5px 2px rgba(255, 255, 255, .5)",
    ],
    scale: [1, 0.8],
    transition: {
      repeat: Infinity,
      duration: 0.5,
    },
  },
};

const ModalLoader = (): ReactElement => {
  return (
    <div className="loader-container d-flex align-items-center justify-content-center px-5 w-100 h-100">
      <motion.div
        variants={containerVariant}
        animate="spin"
        className="loader-padding d-flex"
      >
        <motion.div
          layout
          variants={loaderVariant}
          animate="animate"
          className="loader-ele"
        />
        <motion.div
          layout
          variants={loaderVariant}
          animate="animate"
          className="loader-ele"
        />
        <motion.div
          layout
          variants={loaderVariant}
          animate="animate"
          className="loader-ele"
        />
      </motion.div>
    </div>
  );
};

export default ModalLoader;
