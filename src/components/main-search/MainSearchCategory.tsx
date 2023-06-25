import React from "react";
import { HandleCategoryHoverType } from "./MainSearch";
import { motion, Variants } from "framer-motion";

const buttonVariants: Variants = {
  initial: (isArtist) => ({
    opacity: 0,
    x: isArtist ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "spring",
      stiffness: 120,
    },
  },
  hover: {
    scale: 1.2,
    color: "rgba(255, 255, 255, 0.9)",
    transition: { duration: 0.2 },
  },
  exit: (isArtist) => ({
    opacity: [1, 0, 0],
    x: isArtist ? 100 : -100,
    transition: {
      duration: 0.5,
      opacity: {
        times: [0, 1, 1],
      },
    },
  }),
};

const separatorVariants: Variants = {
  initial: {
    y: -200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
    },
  },
  exit: {
    y: 100,
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
};

const MainSearchCategory = ({
  handleClick,
  handleHover,
}: MainSearchCategoryProps) => {
  return (
    <div className="category-container d-flex flex-grow-1 flex-column gap-5 justify-content-center align-items-center w-100">
      <div className="category-choices d-grid justify-content-center w-100 px-5">
        <motion.button
          custom={true}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover("artists")}
          onMouseLeave={() => handleHover()}
          onClick={() => handleClick("artist")}
        >
          Artists
        </motion.button>
        <motion.div
          variants={separatorVariants}
          whileHover="hover"
          animate="animate"
          initial="initial"
          exit="exit"
          className="category-separator"
        />
        <motion.button
          custom={false}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover("songs")}
          onMouseLeave={() => handleHover()}
          onClick={() => handleClick("track")}
        >
          Songs
        </motion.button>
      </div>
    </div>
  );
};

export default MainSearchCategory;
