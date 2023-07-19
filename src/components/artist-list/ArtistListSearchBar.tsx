import { ReactElement } from "react";
import { AnimationControls, motion, Variants } from "framer-motion";
import SearchBar from "../searchbar/SearchBar";

const artistSearchBarVariants: Variants = {
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

const ArtistListSearchBar = ({
  controls,
}: {
  controls: AnimationControls;
}): ReactElement => {
  return (
    <motion.div
      variants={artistSearchBarVariants}
      className="align-items-center justify-content-end d-flex search-input-container"
    >
      <motion.div animate={controls}>
        <SearchBar />
      </motion.div>
    </motion.div>
  );
};

export default ArtistListSearchBar;
