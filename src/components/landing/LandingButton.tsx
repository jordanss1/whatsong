import { type Variants, motion } from 'motion/react';
import { type ReactElement } from 'react';

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
      type: 'spring',
    },
  },
};

type LandingButtonPropsType = {
  handleHover: (hovered: boolean) => void;
  setFinalAnimation: React.Dispatch<React.SetStateAction<boolean>>;
};

const LandingButton = ({
  setFinalAnimation,
  handleHover,
}: LandingButtonPropsType): ReactElement => {
  return (
    <div className="d-flex justify-content-center align-items-end">
      <motion.button
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        whileHover="hover"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={() => setFinalAnimation(true)}
        type="button"
        className="fs-4 rounded-pill p-3 px-4 start-button"
      >
        Start searching
      </motion.button>
    </div>
  );
};

export default LandingButton;
