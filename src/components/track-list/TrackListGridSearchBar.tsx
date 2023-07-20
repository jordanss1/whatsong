import { ReactElement } from "react";
import { motion } from "framer-motion";
import SearchBar from "../searchbar/SearchBar";
import { searchBarVariants } from "../artist-list/ArtistListSearchBar";

type TrackListGridSearchBarPropsType = {
  cycle: string;
};

const TrackListGridSearchBar = ({
  cycle,
}: TrackListGridSearchBarPropsType): ReactElement => {
  return (
    <div className="d-flex align-items-center justify-content-end track-list-search">
      {cycle === "animate" && (
        <motion.div variants={searchBarVariants}>
          <SearchBar />
        </motion.div>
      )}
    </div>
  );
};

export default TrackListGridSearchBar;
