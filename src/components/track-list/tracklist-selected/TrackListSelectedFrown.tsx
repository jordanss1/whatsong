import { type Variants, motion } from 'motion/react';
import { type ReactElement } from 'react';

const instructionsVariant: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const pathVariants: Variants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    scale: 1.3,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: 'spring',
      stiffness: 200,
    },
  },
  exit: {
    pathLength: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const TrackListSelectedFrown = (): ReactElement => {
  return (
    <>
      <motion.p
        variants={instructionsVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        key="drag"
        className="mb-0 pt-3 fw-bold w-100 text-center"
      >
        Drag orbs here
      </motion.p>
      <motion.svg
        width="120px"
        height="120px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="border-svg"
      >
        <motion.path
          variants={pathVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          d="M16 16C16 16 14.5 14 12 14C9.5 14 8 16 8 16M17 9.24C16.605 9.725 16.065 10 15.5 10C14.935 10 14.41 9.725 14 9.24M10 9.24C9.605 9.725 9.065 10 8.5 10C7.935 10 7.41 9.725 7 9.24M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="rgb(210, 210, 210)"
          strokeWidth=".3"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </motion.svg>
    </>
  );
};

export default TrackListSelectedFrown;
