import { type Variants, motion } from 'motion/react';
import { type ReactElement } from 'react';

const loaderVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    rotateY: 360,
    transition: {
      rotateY: {
        repeat: Infinity,
        type: 'spring',
        duration: 1,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const bgVariant: Variants = {
  hidden: {
    background: 'rgba(0, 0, 0, 0)',
  },
  visible: {
    background: 'rgba(0, 0, 0, 0.6)',
    transition: {
      duration: 0.2,
      delay: 1,
    },
  },
  exit: {
    background: 'rgba(0, 0, 0, 0)',
    transition: {
      duration: 0.2,
    },
  },
};

const ModalLoader = (): ReactElement => {
  return (
    <div className="w-100 h-100">
      <motion.div
        variants={bgVariant}
        className="loader-bg d-flex align-items-center justify-content-center w-100 h-100"
      >
        <motion.div variants={loaderVariant} className="loader-ele d-flex" />
      </motion.div>
    </div>
  );
};

export default ModalLoader;
