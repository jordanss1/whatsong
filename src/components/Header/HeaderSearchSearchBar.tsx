import { ReactElement } from "react";
import { Variants, motion } from "framer-motion";
import SearchBar from "../searchbar/SearchBar";

const searchBarVariants: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const HeaderSearchSearchBar = (): ReactElement => {
  return (
    <motion.div
      variants={searchBarVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="header-search-bar px-3"
    >
      <SearchBar />
    </motion.div>
  );
};

export default HeaderSearchSearchBar;
