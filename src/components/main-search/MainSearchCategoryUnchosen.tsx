import React from "react";
import { Variants, motion } from "framer-motion";
import { HandleCategoryHoverType } from "./MainSearch";

const buttonVariants: Variants = {
  initial: (isArtist) => ({
    opacity: 0,
    x: isArtist ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
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
};

type MainSearchCategoryUnchosenProps = {
  handleHover: HandleCategoryHoverType;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MainSearchCategoryUnchosen = ({
  setCategory,
  handleHover,
}: MainSearchCategoryUnchosenProps) => {
  return (
    <div className="unchosen-container d-flex flex-column gap-5 justify-content-center align-items-center w-100">
      <div className="unchosen-choices d-flex justify-content-center w-100">
        <motion.button
          custom={true}
          initial="initial"
          animate="animate"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover("artists")}
          onMouseLeave={() => handleHover()}
          onClick={() => setCategory("artist")}
        >
          Artists
        </motion.button>
        <motion.div className="unchosen-separator" />
        <motion.button
          custom={false}
          initial="initial"
          animate="animate"
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => handleHover("songs")}
          onMouseLeave={() => handleHover()}
          onClick={() => setCategory("track")}
        >
          Songs
        </motion.button>
      </div>
    </div>
  );
};

export default MainSearchCategoryUnchosen;
