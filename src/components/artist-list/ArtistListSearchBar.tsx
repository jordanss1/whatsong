import { ReactElement } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import SearchBar from "../searchbar/SearchBar";

export const searchBarContainerVariants: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const searchBarVariants: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

type ArtistListSearchbarPropTypes = {
  cycle: string;
};

const ArtistListSearchBar = ({
  cycle,
}: ArtistListSearchbarPropTypes): ReactElement => {
  return (
    <motion.div
      variants={searchBarContainerVariants}
      className="align-items-center justify-content-end d-flex search-input-container"
    >
      <AnimatePresence mode="wait">
        {cycle === "animate" && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={searchBarVariants}
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArtistListSearchBar;
