import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../../searchbar/SearchBar";
import {
  searchBarVariants,
  searchBarContainerVariants,
} from "../../artist-list/ArtistListSearchBar";

type TrackListGridSearchBarPropsType = {
  cycle: string;
};

const TrackListGridSearchBar = ({
  cycle,
}: TrackListGridSearchBarPropsType): ReactElement => {
  return (
    <motion.div
      variants={searchBarContainerVariants}
      className="d-flex align-items-center justify-content-end w-100 track-list-search"
    >
      <AnimatePresence mode="wait">
        {cycle === "animate" && (
          <motion.div
            variants={searchBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackListGridSearchBar;
