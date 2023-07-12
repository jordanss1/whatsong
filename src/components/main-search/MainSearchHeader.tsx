import { ReactElement, useState, useEffect } from "react";
import { Variants, motion, useCycle } from "framer-motion";

const containerVariants: Variants = {
  initial: {
    y: -100,
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
  exit: (redo) =>
    redo
      ? {
          y: -100,
          opacity: 0,
          transition: {
            delay: 0.2,
            duration: 0.5,
            ease: "easeInOut",
          },
        }
      : {},
  hover: {
    scale: 1,
  },
};

const textVariant: Variants = {
  hover: {
    x: -4,
    scale: 1.05,
    color: "rgb(255, 255, 255)",
    transition: {
      duration: 0.2,
    },
  },
};

const iconVariants: Variants = {
  initial: {
    scale: 0.9,
  },
  animate: {
    scale: 1,
  },
  hover: {
    color: "rgb(255, 255, 255)",
  },
  click: {
    color: "rgb(255, 255, 255)",
    rotate: -90,
    x: -5,
    y: 4,
    transition: {
      duration: 0.2,
    },
  },
};

type MainSearchHeaderPropTypes = {
  category: string;
  handleClick: () => void;
};

const MainSearchHeader = ({
  category,
  handleClick,
}: MainSearchHeaderPropTypes): ReactElement => {
  const [confirmRedo, setConfirmRedo] = useState(false);
  const [iconCycle, cycleIcon] = useCycle("animate", "click");

  category = category === "artist" ? "artists" : "songs";

  useEffect(() => {
    setConfirmRedo(false);
  }, []);

  return (
    <div className="d-flex w-100 justify-content-center align-items-end h-50">
      <div className="search-header d-flex justify-content-end align-items-center h-50">
        <motion.div
          custom={confirmRedo}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          onClick={() => {
            handleClick();
            setConfirmRedo(true);
            cycleIcon(1);
          }}
          className="redo d-flex"
        >
          <motion.div variants={textVariant} className="pe-2 redo-category">
            {category}
          </motion.div>
          <button className="redo-button">
            <motion.i
              variants={iconVariants}
              animate={iconCycle}
              className="undo alternate icon fs-4"
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MainSearchHeader;
