import { motion, type Variants } from 'motion/react';
import { type ReactElement } from 'react';
import Seperator from '../Seperator';
import { type HandleCategoryHoverType } from './MainSearch';

const buttonVariants: Variants = {
  initialArtist: {
    opacity: 0,
    x: 100,
  },
  initialSongs: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      type: 'spring',
      stiffness: 120,
    },
  },
  exitArtist: {
    opacity: [1, 0, 0],
    x: 100,
    transition: {
      duration: 0.5,
      opacity: {
        times: [0, 1, 1],
      },
    },
  },
  exitSongs: {
    opacity: [1, 0, 0],
    x: -100,
    transition: {
      duration: 0.5,
      opacity: {
        times: [0, 1, 1],
      },
    },
  },
  hover: {
    scale: 1.2,
    color: 'rgba(255, 255, 255, 0.9)',
    transition: { duration: 0.2 },
  },
};

const separatorVariants: Variants = {
  initial: (redo) => ({
    y: redo ? 200 : -200,
    opacity: 0,
  }),
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      duration: 0.5,
    },
  },
  exit: {
    y: 200,
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

type MainSearchCategoryProps = {
  handleHover: HandleCategoryHoverType;
  handleClick: (category: string) => void;
  redo: boolean;
};

const MainSearchCategory = ({
  handleClick,
  handleHover,
  redo,
}: MainSearchCategoryProps): ReactElement => {
  return (
    <div className="category-container d-flex flex-grow-1 flex-column gap-5 justify-content-center align-items-center w-100">
      <div className="category-choices d-grid justify-content-center w-100 px-5">
        <motion.button
          initial="initialArtist"
          animate="animate"
          exit="exitArtist"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover('artists')}
          onMouseLeave={() => handleHover()}
          onClick={() => handleClick('artist')}
        >
          Artists
        </motion.button>
        <Seperator
          width="2px"
          height="100px"
          variants={separatorVariants}
          custom={redo}
          animate="animate"
          initial="initial"
          exit="exit"
          className="category-separator"
        />
        <motion.button
          initial="initialSongs"
          animate="animate"
          exit="exitSongs"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover('songs')}
          onMouseLeave={() => handleHover()}
          onClick={() => handleClick('track')}
        >
          Songs
        </motion.button>
      </div>
    </div>
  );
};

export default MainSearchCategory;
